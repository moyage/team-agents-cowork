# FAQ & Troubleshooting

## Agent Is Blocked on "Contract Review Pending"
Check `workflow/dispatch.json` for the `current_gate`. If the status is `*_contract_review_pending`, the orchestrator agent must instantiate an independent Sub-Agent to perform the review.

## The Reviewer Rejected the Contract
Read the corresponding `tasks/*-contract-review-decision.json` file. The Reviewer specifies the reason in the `comments` field. Most often, the `allowed_files` boundary is too broad, or `out_of_scope` constraints are not strict enough.

## Error: ENOENT dispatch.json
Ensure your MCP server has the correct relative path. (Fixed in V0.5 M5).

*(Originally documented in `docs/TROUBLESHOOTING.md`)*
