# APC Report

## Démarrer le développement de l'app :

À la racine du projet, lancez la commande ```make compose```.
Celle-ci lancera le container mysql, adminer et l'app laravel final (sans le build du contenu static).

Pour peupler la BDD de Dev (dans cet ordre) :

```bash
  make users  
```
```bash
  make settings
```
```bash
  make customers
```
```bash
  make appointments
```
```bash
  make reports
```

Puis, allez dans le dossier static et lancez la commande ```make exec```.
permettant de lancer le container contenant l'app VueJS en mode interractif.

Une fois dans le container lancer le serveur VueJS avec la commande ```npm run serve```.

Rendez-vous sur http://locahost:4445 pour commencer à développer...


### Pour tester l'envoi d'un email dans tinker :

Créer d'abord un RDV puis à la racine du projet lancez la commande ```make tinker````
puis utiliser la commande ci-dessous.
```php
Illuminate\Support\Facades\Mail::to("lucas.robin@alphapluscourtage.fr")->send(new App\Mail\AppointmentMail(App\Appointment::find(1), App\User::find(1)));
```

Renvoyer confirmation de rendez-vous à Mario
```php
Illuminate\Support\Facades\Mail::to("mario.silveri@alphapluscourtage.fr")->send(new App\Mail\AppointmentMail(App\Appointment::find(1), App\User::find(3)));
```



