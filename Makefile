start-frontend:
	make -C frontend start

start-backend:
	npx start-server 

start:
	make start-backend & make start-frontend

deploy:
	git add .
	git commit -m '${message}'
	git push

lint-frontend:
	make -C frontend lint