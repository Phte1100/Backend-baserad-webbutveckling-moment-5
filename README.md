På  Fille's Burgare har jag skapat flera funktioner för att ge en sån bra användarupplevelsen som möjligt.

För att dynamiskt uppdatera innehållet på sidan används JavaScript och fetch-API. Detta gör att data från servern kan hämtas och visas utan att behöva ladda om sidan. Till exempel används detta för att visa aktuella menyposter och uppdatera bokningslistan i realtid.

För att hantera formulärdata används JavaScript för att skicka data till servern. När en användare skickar in ett bokningsformulär, saneras data innan den skickas för att förhindra XSS-attacker (Cross-Site Scripting). Detta säkerställer att endast giltig och säker data behandlas, vilket skyddar både användarna och servern från potentiella säkerhetshot.

Event listeners används för att hantera olika användarinteraktioner på sidan, såsom klick på knappar och inmatning i formulär. Detta gör det möjligt att utföra specifika funktioner som att skapa, uppdatera och radera bokningar direkt från användargränssnittet.

För att ge användarna direkt feedback används en snackbar-funktion som visar meddelanden när åtgärder har slutförts, såsom att en bokning har skapats eller uppdaterats. Detta förbättrar användarupplevelsen genom att ge tydlig och omedelbar återkoppling.

Användare kan skapas och logga in på sidan. Sidan är också responsiv.