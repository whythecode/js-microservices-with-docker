# Workflow

Note: to view the following diagrams, you'll need [Mermaid](https://mermaidjs.github.io/).
You can also just copy the following code into the 
    [Mermaid live editor](https://mermaidjs.github.io/mermaid-live-editor/).

Dev
```mermaid
graph TD
	StartApp[Start app container] -->|set BaseHref| BuildApp
	BuildApp[Build app] --- Nginx
	BuildApp --> AppChanged{App changed?}
	AppChanged --> BuildApp
	StartNginx -->|write ENVs| Nginx
```

Prod
```mermaid
graph TD
	StartNginxProd -->|rewrite BaseHref, write ENVs| NginxProd
```


