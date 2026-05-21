# Bilan de séance

## Ce que j'ai fait concrètement

J'ai réussi à faire fonctionner le déploiement, qui était clairement le chantier le plus long de la période. Il y avait plusieurs points à débloquer un par un avant que ça tourne correctement. Une fois en place, j'ai passé du temps à corriger les erreurs qui remontaient : des bugs qui n'apparaissaient pas en local mais qui se manifestaient dès qu'on passait sur le vrai environnement.

La configuration DNS a aussi pris plus de temps que prévu à cause des spécificités de Scalingo. Et j'ai profité de ça pour mettre en place les règles de protection sur `main` et faire un nettoyage des branches : `develop` est supprimée, le reste est planifié.

## Où j'en suis

On est sur un premier MVP fonctionnel. Le déploiement tourne, le DNS est calé, les features de base sont vérifiées. Il reste des choses à traiter : les infos de base de l'app (nom, icône) ne sont pas encore renseignées, et il y a un FIX à merger.

La priorité à court terme c'est surtout de migrer vers une vraie base de données de prod, parce qu'on tourne encore sur la base de dev en ce moment. C'est pas tenable dès qu'on commence à avoir de vrais utilisateurs.

Sur le plan qualité, les tests automatisés, le linting et les hooks pre-commit ne sont pas encore en place. Je les ai mis de côté pour avancer sur le déploiement, mais ça ne peut pas rester comme ça.

## Ce qui a aidé l'équipe

Avoir un déploiement qui fonctionne vraiment change les choses. Avant ça, on ne pouvait pas valider grand chose en dehors du local. Maintenant on a un vrai environnement sur lequel s'appuyer pour tester et recueillir des retours.

Le nettoyage des branches et les règles sur `main` aident aussi à garder un workflow clair, surtout qu'on commence à être plusieurs à contribuer.

## Un problème identifié

Le fait qu'on tourne encore sur la base de dev en production est un vrai risque. Si quelqu'un commence à entrer de vraies données ou à tester en conditions réelles, ça peut vite poser des problèmes de cohérence ou de perte de données.

L'absence d'outillage qualité (linting, tests, hooks) fait qu'on n'a aucun filet de sécurité non plus. N'importe quoi peut être commité et déployé sans contrôle. Ça passe pour l'instant, mais dès qu'on sera plusieurs à contribuer régulièrement, ça deviendra problématique.

Sur l'organisation, il y a eu quelques frictions avec la gestion du chef de projet. Le suivi de l'avancement était assez léger, et il est arrivé que du travail soit repris ou refait en parallèle de ce qui avait été délégué, ce qui a créé un peu de confusion. La gestion du nom de domaine, centralisée sur son compte sans accès délégué, a aussi compliqué les interventions DNS et rallongé inutilement certaines tâches.

## Ma proposition pour améliorer

La migration vers une base de prod doit passer en priorité absolue avant d'aller plus loin. C'est un prérequis pour que le MVP soit vraiment exploitable.

Ensuite, je pense qu'on devrait prendre du temps pour mettre en place le linting et les hooks pre-commit avant de continuer à empiler des features. C'est rapide à faire et ça évite des allers-retours en review. Pour les tests, c'est un chantier plus long, mais on peut commencer petit en couvrant les flux les plus critiques. Si on se fixe une règle "pas de merge sans tests sur les nouveaux trucs", ça nous pousse à le faire au fur et à mesure plutôt que de tout remettre à plus tard.
