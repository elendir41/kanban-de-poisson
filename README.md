# Kanban de poisson

## Auteurs

matteo.perisse<br>jean.barbaroux<br>alexis1.papagno<br>clement.do-rosario

## Description
Kanban de poisson est un site de gestionnaire de kanban permettant d'ajouter des colonnes, des taches à faire et les ordonner grâce à du drag and drop

## Architecture du projet
Le dossier pages/ contient toutes les pages accessibles dans l'application.<br>
Certaines sont publiques et d'autre privées en fonction de si l'utilisateur est authentifié ou non en fonction d'un token set dans le localstorage.

Le projet est séparé en plusieurs couches.<br>
- La couche la plus basse est celle des services. Ils sont gérés via un context pour faire de l'injection de dépendance.

- Ces services sont ensuites utilisés dans des hooks permettant de traiter et de faire remonter les infos via les states gérés grâce à Zustand ou d'autre context.

- Les composants du dossier components/ utilisent ces hooks pour mettre à jour les données et utilisent les composants du dossier components/ui/ pour gérer le ui.

## Drag and Drop
Le drag and drop est géré via la librairie dnd-kit.

Le drag and drop permet de réorganiser les différentes taches et colonnes d'un kanban.

Pour une réactivité accrue, le design pattern optimistic est utilisé. De ce fait, il y a deux états des colonnes et taches dans l'appli. Le premier permettant d'afficher rapidement les changements et l'autre permettant de faire un rollback en cas d'erreur lors d'un call api.
