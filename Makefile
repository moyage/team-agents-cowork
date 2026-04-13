.PHONY: install verify doctor sync upgrade

install:
	@echo "--> Installing agent-collab-kit into target project..."
	@./install.sh

verify:
	@echo "--> Verifying protocol consistency..."
	@python3 scripts/verify_protocol.py

doctor:
	@echo "--> Running environment & compliance diagnostics..."
	@python3 scripts/doctor.py

sync:
	@echo "--> Syncing generated artifacts..."
	@python3 scripts/sync.py
