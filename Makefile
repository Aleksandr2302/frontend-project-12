build:
	npm run build
start-frontend:
	npm -C frontend start
start-backend:
	npx start-server
develop:
	make start-backend & make start-frontend
lint:
	eslint frontend