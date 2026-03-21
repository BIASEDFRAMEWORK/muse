#!/usr/bin/env bash
set -euo pipefail

# Error handling function
error_exit() {
    echo "❌ Error: $1" >&2
    echo "🔴 GitHub hardening failed. Please check your setup and try again." >&2
    exit 1
}

# Check if gh CLI is available
if ! command -v gh >/dev/null 2>&1; then
    error_exit "gh CLI is required but not found in PATH. Install from https://cli.github.com/"
fi

# Validate gh CLI authentication
if ! gh auth status >/dev/null 2>&1; then
    error_exit "gh CLI is not authenticated. Run 'gh auth login' first."
fi

# Determine repository information
if [ -n "${1:-}" ] && [ -n "${2:-}" ]; then
    OWNER="$1"
    REPO="$2"
else
    echo "🔍 Detecting repository information..."
    if ! REPO_FULL="$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null)"; then
        error_exit "Failed to detect repository information. Are you in a git repository with a GitHub remote?"
    fi
    OWNER="${REPO_FULL%%/*}"
    REPO="${REPO_FULL##*/}"
fi

BRANCH="${3:-main}"

echo "🔒 Applying code security settings on ${OWNER}/${REPO}..."

# Apply security settings
if ! gh api \
  --method PATCH \
  -H "Accept: application/vnd.github+json" \
  "/repos/${OWNER}/${REPO}" \
  -F allow_auto_merge=true \
  -f security_and_analysis='{"advanced_security":{"status":"enabled"},"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"},"dependabot_security_updates":{"status":"enabled"}}' \
  >/dev/null; then
    error_exit "Failed to apply security settings. Check repository permissions."
fi

echo "🛡️ Applying branch protection on ${OWNER}/${REPO}:${BRANCH}..."

# Apply branch protection
if ! gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  "/repos/${OWNER}/${REPO}/branches/${BRANCH}/protection" \
  --input - <<'JSON' \
  >/dev/null; then
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["build", "cli-tests", "traceability", "actionlint", "npm-audit"]
  },
  "required_conversation_resolution": true,
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 0,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
JSON
    error_exit "Failed to apply branch protection. Check repository permissions and branch existence."
fi

echo "✅ GitHub hardening completed successfully!"
echo "🔍 Verify settings at: https://github.com/${OWNER}/${REPO}/settings/security_analysis"
echo "🛡️ Verify branch protection at: https://github.com/${OWNER}/${REPO}/settings/branches"

echo "Verifying hardening and merge-queue prerequisites..."

auto_merge_enabled="$(gh api -H "Accept: application/vnd.github+json" "/repos/${OWNER}/${REPO}" --jq '.allow_auto_merge')"
strict_status_checks="$(gh api -H "Accept: application/vnd.github+json" "/repos/${OWNER}/${REPO}/branches/${BRANCH}/protection" --jq '.required_status_checks.strict')"
conversation_resolution="$(gh api -H "Accept: application/vnd.github+json" "/repos/${OWNER}/${REPO}/branches/${BRANCH}/protection" --jq '.required_conversation_resolution.enabled')"
required_approvals="$(gh api -H "Accept: application/vnd.github+json" "/repos/${OWNER}/${REPO}/branches/${BRANCH}/protection" --jq '.required_pull_request_reviews.required_approving_review_count')"

if [ "$auto_merge_enabled" != "true" ] || [ "$strict_status_checks" != "true" ] || [ "$conversation_resolution" != "true" ] || [ "$required_approvals" != "0" ]; then
  echo "❌ Merge queue prerequisites are not fully satisfied."
  echo "allow_auto_merge=${auto_merge_enabled}"
  echo "required_status_checks.strict=${strict_status_checks}"
  echo "required_conversation_resolution.enabled=${conversation_resolution}"
  echo "required_pull_request_reviews.required_approving_review_count=${required_approvals}"
  exit 1
fi

echo "✅ Hardening applied and merge-queue prerequisites are satisfied."
