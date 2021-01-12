# APC Report

### Démarrer le développement de l'app :

À la racine du projet, lancez la commande ```make compose```.
Celle-ci lancera le container mysql, l'app laravel final sans le contenu static builder.

Puis, allez dans le dossier static et lancez la commande ```make exec```.
permettant de lancer le container contenant l'app VueJS en mode interractif.

Une fois dans le container lancer le serveur VueJS avec la commande ```npm run serve```.

Pour tester l'envoi d'un email dans tinker :

Créer d'abord un RDV puis à la racine du projet lancez la commande ```make tinker````
puis utiliser la commande ci-dessous.
```php
Illuminate\Support\Facades\Mail::to("lucas.robin@alphapluscourtage.fr")->send(new App\Mail\AppointmentMail(App\Appointment::find(1), App\User::find(1)));
```