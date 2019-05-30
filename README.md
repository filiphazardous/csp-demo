# CSP demo för Front-end-utbildningen på Medieinstitutet

* Installera beroenden med `npm i`
* Starta servern med `npm start`


## Några exempel på skadliga kommentarer
```
<script>
document.body.innerHTML = '<h1>Du har blivit hackad! Katter är dumma!!'
</script>
```

och
```
<style>
h1:after { content: "Bara skojade - de är urfåniga!" }
</style>
```

## Lösningar

### Begränsa tillåtna källor för javascript

Lägg till följande rad efter `var server = http.osv`:

```javascript
res.setHeader('Content-Security-Policy', "script-src 'self'");
```
Om du vill kunna ladda filer från andra källor (t ex Google maps, Bootstrap el dyl) så kan du
 tillåta även ändra källor så här:
 ```javascript
 res.setHeader('Content-Security-Policy', "script-src 'self' https://apis.google.com");
 ```
 
 ### Begränsa tillåtna källor för CSS
 
För att begränsa även CSS på motsvarande sätt, lägg till lite till:
```javascript
res.setHeader('Content-Security-Policy', "script-src 'self'; style-src 'self'");
```