build:
	npm run build
start-frontend:
	npm -C frontend start
start-backend:
	npx start-server
develop:
	make start-backend & make start-frontend
lint:
	find frontend \( -name '*.js' -o -name '*.jsx' \) -not -path 'frontend/build/*' -not -path 'frontend/node_modules/*' | xargs eslint --ignore-path frontend/.eslintignore