start-frontend:
	npm -C frontend start
start-backend:
	npm start
develop:
	make start-backend & make start-frontend
lint:
	find frontend \( -name '*.js' -o -name '*.jsx' \) -not -path 'frontend/build/*' -not -path 'frontend/node_modules/*' | xargs eslint --ignore-path frontend/.eslintignore
install:
	npm ci
	cd frontend && npm ci
build:
	rm -rf frontend/build
	npm run build
start:
	make start-backend
test:
	npx playwright test --config=playwright.config.js