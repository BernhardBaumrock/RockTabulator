You can define the access to your grid either via callback function or as a
string. If it is set as string, PW will check if the user has the permission
with the given name:

```php
$grid->access = 'your-permission';
// performs $user->hasPermission('your-permission')
```