# Schema Reference (Execution Artifacts)

The V0.5 JSON contract and execution schemas define the required fields for routing agents.

## Execution Contract
- `task_id` (string)
- `description` (string)
- `scope` (string)
- `out_of_scope` (string)
- `allowed_files` (array)
- `allowed_artifacts` (array, added M3)
- `required_outputs` (array)
- `stop_conditions` (array)

## Review Decision
- `reviewer` (string)
- `decision` ("Approved" | "Rejected")
- `timestamp` (string)
- `comments` (string)

## Execution Result
- `task_id` (string)
- `status` (string)
- `summary` (string)
- `implementation_changes` (array)
- `artifact_changes` (array)
- `closure_state_changes` (array)

*(Original schema definitions remain in the `schemas/` folder.)*
