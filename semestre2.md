Difficultés

1. Scalingo ne fournit qu'un nom de domaine, pas d'IP donc redirection compliquée
2. Problèmes de résolutions DNS : type de redirection mal configurés : obligé de passer de rediriger le sous domaine donc www
3. HTTPs difficile à configurer dans Scalingo car géré au niveau du DNS et non de Scalingo
4. Variables de prod pour l'URL de Supabase compliquée à trouver. pas réusis à la faire fonctionner donc on utilise la même qu'en dev
5. Compte perso OVH


6. Base de prod et dev unique : problème de Supabase

archi CD :

1. Dev pousse sur GitHub (branche `main` ou autre)
2. Déclenchement manuel du déploiement depuis le dashboard Scalingo (branche choisie)
3. Scalingo récupère le code → buildpack Node.js → build (`npm install` + `next build`) → produit un *slug*
4. Lancement d'un nouveau conteneur à partir du slug (commande du `Procfile`)
5. Bascule du routeur Scalingo vers le nouveau conteneur, arrêt de l'ancien
6. Site accessible et à jour

Archi réseau du site Scalingo (container, DNS publique, dns scalingo, services etc...)

Chemin HTTP user → conteneur :

1. Navigateur → résolveur DNS : `dividy.xxx`
2. Registrar (DNS public) → CNAME vers `dividy.osc-fr1.scalingo.io`
3. DNS Scalingo → IP du routeur d'entrée (LB mutualisé)
4. Navigateur → routeur Scalingo en HTTPS (terminaison TLS ici)
5. Routeur → conteneur de l'app en HTTP interne sur `$PORT`
6. Conteneur Next.js traite la requête et répond

Globalement :

1. Aides diverses sur Git car bonne connaissances : aide aux rebases, merges, dev en parallèle sur même branche conflictueux pour avoir un historique clean.
2.


Solutions à prévoir :

- Sortir de Scalingo car projet minimaliste
- Créer base de prod
- CI : lint, pré commits...?
