# GitHub Copilot -harjoitukset: Full-Stack Notes App

Tämä dokumentti tarjoaa sarjan harjoituksia, joiden avulla opit ja harjoittelet GitHub Copilotin ominaisuuksien käyttöä Full-Stack Notes App -projektissa. Harjoituksissa käydään läpi koodipohjan tutkimista, uusien ominaisuuksien ideointia ja niiden toteutusta Copilotin avulla sekä React-frontendissä että Express-backendissä.

**Keskeiset Copilotin käyttöalueet:**

* **Chat-näkymä:** Käytetään kysymysten esittämiseen, koodin/testien/dokumentaation generointiin ja toimintojen käynnistämiseen. Tilat kuten "Ask" (oletus), "Edits" ja "Agent" voivat olla valittavissa chat-näkymän valikosta.
* **Inline Chat:** Nopea keskustelu suoraan editorissa (Oletus: `Cmd+I` / `Ctrl+I`), usein käytetään nopeisiin selityksiin tai valitun koodin muokkaukseen. Useita ehdotuksia voi selata pikanäppäimillä (esim. `Alt+]`/`Option+]` tai Komentopaletti: "Copilot: View Next/Previous Suggestion").
* **Osallistujat (`@`-viittaukset):** Tuovat laajaa kontekstia keskusteluun, kuten koko työtilan (`@workspace`) tai VS Code -ympäristön (`@vscode`). **Tärkeä rajoitus:** Vain **yksi osallistuja** (esim. `@workspace` TAI `@vscode`) per chat-kysymys.
* **Muuttujat (`#`-viittaukset):** Antavat tarkempaa kontekstia Copilotille (esim. tiedostot `#file`, valinnat `#selection`, symbolit `#sym`, symbolin käytöt/määrittelyt `#usage`, muutokset `#changes`, koodipohjan rakenne `#codebase`, verkkosisältö `#fetch`, viimeisin terminaalikomento `#terminalLastCommand`, terminaalivalinta `#terminalSelection`). Muuttujia *voi* yhdistää osallistujaan (esim. `@workspace #file:SomeFile.java`).
    * **Interaktiivinen valinta:** Tiedostoille, kansioille, symboleille (`#sym`) ja käyttöhaulle (`#usage`) voit kirjoittaa `#` ja alkaa kirjoittaa nimeä; VS Code ehdottaa vastaavia kohteita työtilasta.
    * **Raahaa ja pudota:** Voit myös raahata tiedostoja tai kansioita suoraan Explorerista chatin syötekenttään.
* **Slash-komennot:** Ohjaavat Copilotin toimintaa chatissa tai inline chatissa (esim. `/explain`, `/tests`, `/fix`, `/new`).
* **Koodin täydennys:** Automaattiset ehdotukset kirjoittaessa.
* **Mukautetut ohjeet:** Tiedostot kuten `.github/copilot-instructions.md` ohjaavat Copilotin ehdotuksia työtilassa.

**Huomio `@workspace` vs `#codebase` ja osallistujien käyttö:**

Sekä `@workspace` että `#codebase` tarjoavat Copilotille kontekstin koko projektista/työtilasta, eli **toimivat käytännössä samalla tavalla**. Käyttötilanteet voivat kuitenkin erota:
* `@workspace` on vakiomuotoinen **osallistuja** yleisiin projektikysymyksiin, yleensä "Ask"-tilassa. Osallistujana siihen pätee **yksi osallistuja per kysymys** -sääntö.
* `#codebase` on **muuttuja**, joka viittaa myös työtilan kontekstiin. Se voi olla erityisen hyödyllinen tai vaadittu tietyissä tiloissa kuten "Edits" tai "Agent" (`/new`), joissa tarvitaan syvempää analyysia koko koodipohjasta. Koska se on muuttuja, sitä voi käyttää yhdessä esim. `@vscode`-osallistujan kanssa.

Näissä harjoituksissa käytetään yleensä `@workspace`-osallistujaa laajoihin "Ask"-kysymyksiin ja `#codebase`-muuttujaa, kun tarvitaan laajaa kontekstia Edits/Agent-tiloissa. Kokeile rohkeasti, mikä toimii parhaiten omassa tilanteessasi.

**Edellytykset:**

* Visual Studio Code asennettuna.
* GitHub Copilot ja Copilot Chat -laajennukset asennettu ja konfiguroitu.
* Notes App -projekti avattuna VS Codessa.
* Integroitu terminaali auki VS Codessa (esim. Näytä > Terminaali).
* Perustiedot JavaScriptistä, Reactista, Tailwind CSS:stä ja Node.js/Expressistä.
* Node.js ja npm asennettuna.

---

## Osa 1: Koodipohjan ja ympäristön tutkiminen

**Tavoite:** Käytä Copilot Chatia eri kontekstin tarjoajien kanssa (`@workspace`, `#file`, `#folder`, `#sym`, `#usage`, `#fetch`, `#terminalLastCommand`, `#terminalSelection`, `@vscode`) saadaksesi nopeasti käsityksen projektista, sen riippuvuuksista, komponenttien suhteista, kehitysympäristöstä ja ulkoisesta tiedosta.

---

### Harjoitus 1.1: Projektin yleiskatsaus (`@workspace`, `/explain`)

* **Tarkoitus:** Saada yleiskuva projektin tavoitteista, pääkomponenteista ja rakenteesta laajalla työtilakontekstilla.
* **Tavoite:** Harjoittele `@workspace`-osallistujan käyttöä Copilot Chatissa "Ask"-tilassa.
* **Vaiheet:**
    1.  Avaa Copilot Chat -näkymä VS Codessa. Varmista, että tila on "Ask".
    2.  Tarkastele Copilotin selitystä.

---

### Harjoitus 1.2: Yksittäisen komponentin ymmärtäminen (`#` tiedostoviittaus, `/explain`)

* **Tarkoitus:** Ymmärtää syvemmin tiettyä tiedostoa tai komponenttia projektissa.
* **Tavoite:** Harjoittele yksittäisten tiedostojen viittaamista `#`-etuliitteellä.
* **Vaiheet:**
    1.  Avaa Copilot Chat -näkymä.
    2.  *(Vaihtoehto)* Kokeile raahata tiedosto Explorerista chatin syötekenttään `#`-viittauksen sijaan.

---

### Harjoitus 1.3: Riippuvuuksien selittäminen (`#` tiedostoviittaus, `/explain`)

* **Tarkoitus:** Ymmärtää projektin riippuvuudet ja niiden tarkoitus nopeasti.
* **Tavoite:** Harjoittele package.json-tiedostojen tulkintaa Copilotilla.
* **Vaiheet:**
    1.  Avaa Copilot Chat -näkymä.

---

### Harjoitus 1.4: Dokumentaation generointi (`#selection`)

* **Tarkoitus:** Luoda tai parantaa dokumentaatiota olemassa olevaan koodiin.
* **Tavoite:** Käytä `#selection`-muuttujaa kontekstina dokumentaation generointiin.
* **Vaiheet:**
    1.  Avaa tiedosto `frontend/src/components/useCreateDate.jsx`.
    2.  Tarkastele ja ota käyttöön Copilotin generoima dokumentaatio.

---

### Harjoitus 1.5: Kansion sisällön tutkiminen (`#` kansioviittaus, `/explain`)

* **Tarkoitus:** Saada yhteenveto kansion koodista.
* **Tavoite:** Harjoittele kansion viittaamista `#`-etuliitteellä interaktiivisen valinnan avulla.
* **Vaiheet:**
    1.  Avaa Copilot Chat -näkymä.
    2.  *(Vaihtoehto)* Kokeile raahata `components`-kansio Explorerista chatin syötekenttään.

---

### Harjoitus 1.6: Tietyn symbolin tutkiminen (`#` symboliviittaus, `/explain`)

* **Tarkoitus:** Ymmärtää funktio, metodi tai komponentti useissa tiedostoissa.
* **Tavoite:** Harjoittele symboliviittausten käyttöä.
* **Vaiheet:**
    1.  Avaa Copilot Chat -näkymä.

---

### Harjoitus 1.7: Ulkoisen tiedon hakeminen (`#fetch`, `/explain`)

* **Tarkoitus:** Hakea ja käyttää tietoa ulkoisilta verkkosivuilta Copilotin avulla.
* **Tavoite:** Harjoittele `#fetch`-muuttujan käyttöä dokumentaatioviitteiden tuomiseksi.
* **Vaiheet:**
    1.  Avaa Copilot Chat -näkymä.
    2.  Tarkastele Copilotin analyysiä, joka yhdistää ulkoisen tiedon koodipohjan kontekstiin.

---

### Harjoitus 1.8: Kysymyksiä VS Codesta (`@vscode`, `/explain`)

* **Tarkoitus:** Saada apua VS Coden ominaisuuksista tai käytöstä tässä projektissa.
* **Tavoite:** Harjoittele `@vscode`-osallistujan käyttöä.
* **Vaiheet:**
    1.  Avaa Copilot Chat -näkymä. Varmista, että tila on "Ask".
    2.  Tarkastele Copilotin selitystä VS Coden ominaisuuksista.

---

### Harjoitus 1.9: Terminaalikomentojen ymmärtäminen (`#terminalLastCommand`, `/explain`)

* **Tarkoitus:** Käyttää Copilotia selittämään integroituun terminaaliin syötettyjä komentoja.
* **Tavoite:** Harjoittele `#terminalLastCommand`-muuttujan käyttöä.
* **Vaiheet:**
    1.  Avaa integroitu terminaali VS Codessa (Näytä > Terminaali).
    2.  Tarkastele Copilotin selitystä npm-komennosta.

---

### Harjoitus 1.10: Terminaalin tulosteen selittäminen (`#terminalSelection`, `/explain`)

* **Tarkoitus:** Saada selitys tietylle osalle terminaalin tulostetta.
* **Tavoite:** Harjoittele `#terminalSelection`-muuttujan käyttöä.
* **Vaiheet:**
    1.  Suorita terminaalissa komento, joka tuottaa yksityiskohtaista tulostetta.
    2.  Tarkastele Copilotin selitystä valitusta tulosteesta.

---

### Harjoitus 1.11: Symbolin käyttökohteiden löytäminen (`#usage`)

* **Tarkoitus:** Selvittää, missä ja miten tiettyä komponenttia tai funktiota käytetään projektissa.
* **Tavoite:** Harjoittele `#usage`-muuttujan käyttöä symbolin viittausten löytämiseksi.
* **Vaiheet:**
    1.  Etsi kaikki `NoteItem`-komponentin käyttökohteet.
    2.  Tarkastele Copilotin selitystä, missä ja miten `NoteItem`-komponenttia käytetään.

---

### Harjoitus 1.12: VS Coden haun tulosten hyödyntäminen (`#searchResults`, `/explain`)

* **Tarkoitus:** Hyödyntää VS Coden hakutoimintoa Copilotin analyysin kanssa.
* **Tavoite:** Harjoittele hakutulosten käyttöä kontekstina Copilot-kysymyksissä.
* **Vaiheet:**
    1.  Avaa VS Coden hakunäkymä (yleensä Ctrl+Shift+F / Cmd+Shift+F).
    2.  Tarkastele Copilotin analyysiä hakutulosten perusteella.

---

## Osa 2: Uusien ominaisuuksien ideointi Copilot Chatilla

**Tavoite:** Käytä Copilot Chatia ideointikumppanina hyödyntäen sen ymmärrystä koodipohjasta (`#codebase` tai `@workspace`).

---

### Harjoitus 2.1: Ominaisuusideoiden ideointi (`#codebase`)

* **Tarkoitus:** Generoida ideoita, jotka voisivat parantaa muistiinpanosovellusta.
* **Tavoite:** Harjoittele `#codebase`-muuttujan käyttöä laajan konteksti-analyysin ja ideoinnin tukena.
* **Vaiheet:**
    1.  Kirjoita Copilot Chat -näkymään:
    2.  Arvioi Copilotin ehdotukset.

---

### Harjoitus 2.2: Idean tarkempi tutkiminen (`#codebase`)

* **Tarkoitus:** Syventyä tietyn ominaisuuden toteutettavuuteen.
* **Tavoite:** Käytä Copilotia tutkimaan ominaisuuden toteutuksen yksityiskohtia.
* **Vaiheet:**
    1.  Valitse jokin ehdotetuista ominaisuuksista (esim. "muistiinpanojen kategorisointi/tägit").
    2.  Tarkastele Copilotin yksityiskohtaista analyysiä.

---

### Harjoitus 2.3: Virheenkäsittelyn parantaminen (`#codebase`)

* **Tarkoitus:** Tunnistaa kohdat, joissa virheenkäsittelyä voisi parantaa.
* **Tavoite:** Harjoittele `#codebase`-muuttujan käyttöä mahdollisten heikkouksien analysointiin.
* **Vaiheet:**
    1.  Kirjoita Copilot Chat -näkymään:
    2.  Arvioi Copilotin ehdotukset.

---

### Harjoitus 2.4: Ominaisuuden toteutettavuuden arviointi API-dokumentaation avulla (`#codebase`, `#fetch`, `/explain`)

* **Tarkoitus:** Arvioida, voiko ominaisuuden toteuttaa käytettävissä olevilla API-rajapinnoilla.
* **Tavoite:** Harjoittele yhdistämään `#codebase`-konteksti haettuun API-dokumentaatioon ja käyttämään `/explain`-komentoa analyysiin.
* **Vaiheet:**
    1.  Valitse ominaisuus, joka voisi hyödyntää kolmannen osapuolen palvelua (esim. "kuvaliitteiden lisääminen muistiinpanoihin").
    2.  Tarkastele Copilotin arviota ominaisuuden toteutettavuudesta nykyisessä koodipohjassa ja ulkoisen API:n avulla.

---

## Osa 3: Ominaisuuksien toteutus Copilotilla

**Tavoite:** Käytä Copilotin koodigenerointiominaisuuksia (täydennys, Edits-tila, agentit, slash-komennot, inline chat -ehdotukset) toteuttaaksesi muutoksia, käyttäen `#codebase`-muuttujaa laajan kontekstin tarpeisiin generointi-/muokkaustiloissa.

---

### Harjoitus 3.1: Muistiinpanokategorioiden toteutus (koodin täydennys & Edits-tila)

* **Tarkoitus:** Toteuttaa muistiinpanojen kategorisointi Backlog 2:n mukaisesti, lisätä kategoriat muistiinpanoihin ja mahdollisuus suodattaa kategorian mukaan.
* **Tavoite:** Harjoittele koodin täydennystä ja Edits-tilaa ominaisuuksien lisäämiseksi käyttäjävaatimusten pohjalta.
* **Vaiheet:**
    1.  **Backend-muutokset (Edits-tila):**

---

### Harjoitus 3.2: Yksikkötestien generointi (`#` tiedostoviittaukset, `/tests`)

* **Tarkoitus:** Luoda testitapauksia olemassa olevalle toiminnallisuudelle.
* **Tavoite:** Harjoittele `/tests`-komennon käyttöä tiedostoviittausten kanssa.
* **Vaiheet:**
    1.  Avaa Copilot Chat -näkymä.
    2.  Suorita testit, jos ympäristö on siihen valmis.

---

### Harjoitus 3.3: Lomakekomponenttien refaktorointi Edits-tilassa

* **Tarkoitus:** Parantaa lomakekoodia Edits-tilassa refaktoroimalla duplikaattikoodia samankaltaisten komponenttien välillä.
* **Tavoite:** Harjoittele Edits-tilan käyttöä DRY-periaatteen (Don't Repeat Yourself) mukaisesti ja paranna koodin ylläpidettävyyttä.
* **Vaiheet:**
    1.  **Analysoi duplikaattikoodi:**

---

### Harjoitus 3.4: Uuden komponentin luominen (`#codebase`, `/new`)

* **Tarkoitus:** Generoida täysin uusi komponentti, joka integroituu olemassa olevaan järjestelmään.
* **Tavoite:** Harjoittele `/new`-agenttitilan käyttöä `#codebase`-kontekstin kanssa.
* **Vaiheet:**
    1.  Avaa Copilot Chat -näkymä.
    2.  Tarkastele Copilotin tulosta ja seuraa ohjeita tilastokomponentin toteuttamiseksi.

---

### Harjoitus 3.5: Koodimuutosten tarkastelu (`#changes`, `/explain`)

* **Tarkoitus:** Käyttää Copilotia yhteenvetämään odottavat muutokset.
* **Tavoite:** Harjoittele `#changes`-muuttujan käyttöä.
* **Vaiheet:**
    1.  Tee muutama pieni, erillinen muutos yhteen tai kahteen tiedostoon (esim. lisää kommentti `App.jsx`:ään, muuta hieman tulostusmuotoa).
    2.  Tarkastele Copilotin yhteenvetoa odottavista muutoksista.

---

### Harjoitus 3.6: Copilotin mukauttaminen jaetuin ohjein

* **Tarkoitus:** Vaikuttaa Copilotin generointiin `.github/copilot-instructions.md`-tiedoston avulla.
* **Tavoite:** Määrittele ohje, tarkkaile vaikutusta.
* **Vaiheet:**
    1.  **Huom:** Tässä projektissa on jo `.github/copilot-instructions.md` -tiedosto, jossa on koodausohjeet.

---

### Harjoitus 3.7: Koko toteutusprosessi (Ideointi -> Speksi -> Toteutus -> Refaktorointi)

* **Tarkoitus:** Simuloida pienen ominaisuuden kehityssykliä käyttämällä Copilotin eri ominaisuuksia peräkkäin.
* **Tavoite:** Harjoittele Ask-tilaa ideointiin/speksaukseen, `#`-tiedostoviittauksia toteutusohjeisiin ja Edits-tilaa viimeistelyyn.
* **Vaiheet:**
    1.  **A. Ideointi (Ask):** Copilot Chatissa (Ask-tila) anna kehotus:
    2.  **F. Viimeistely (Edits):** Tarkastele toteutettua koodia. Valitse kohdat, joita voisi selkeyttää tai tehdä kestävämmiksi. Käytä Edits-tilaa kehotteilla kuten "Refaktoroi tämä suosikkitilan vaihtologiikka selkeämmäksi" tai "Lisää virheenkäsittely, jos API-kutsu suosikkitilan päivittämiseksi epäonnistuu".

---

### Harjoitus 3.8: Inline Chat -ehdotusten tarkastelu

* **Tarkoitus:** Harjoitella useiden Copilotin inline chat -ehdotusten selaamista.
* **Tavoite:** Käytä inline chatia yksinkertaiseen tehtävään ja selaa Copilotin tarjoamia eri vaihtoehtoja.
* **Vaiheet:**
    1.  Avaa `frontend/src/components/NoteItem.jsx`.
    2.  Valitse haluamasi ehdotus ja hyväksy se (yleensä painamalla `Tab` tai klikkaamalla "Accept").

---

## Osa 4: Valinnaiset edistyneet harjoitukset

**Tavoite:** Tutkia Copilotin kehittyneempiä tai erikoistuneempia käyttötapoja perusprosessien lisäksi.

---

### Harjoitus 4.1: Debuggausapu (ajonaikaiset virheet)

* **Tarkoitus:** Harjoitella Copilot Chatin käyttöä ajonaikaisten virheiden ymmärtämiseen.
* **Tavoite:** Käytä `#`-tiedostoviittauksia ja liitettyjä virheilmoituksia pyytääksesi Copilotilta näkemyksiä.
* **Vaiheet:**
    1.  Edistyneempiin työnkulkuihin voit luoda kehotetiedostoja `.github/copilot/prompts`-kansioon (luo tämä tarvittaessa). Näissä voi määritellä monivaiheisia ohjeita toistuvia tehtäviä varten (esim. vakiorefaktorointi, koodin generointi mallista, tarkistuslistat). Voit käyttää paikkamerkkejä ja yhdistää kontekstimuuttujiin. Vaikka tästä ei ole erillistä harjoitusta, kannattaa kokeilla, jos annat Copilotille usein samoja monimutkaisia ohjeita.
