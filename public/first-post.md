# Første post (08.04.24)

Første post. Ville prøva å laga ein weblog på GH pages fort som fy. Har lekt litt med [Bun.sh](https://bun.sh/) i det siste og sjekka ut mulige templates. [Astro](https://astro.build/) såg veldig enkelt og greit ut. Kjørte `bun create astro` som kjørte ein (veldig kul ngl) CLI wizard, som ga meg mulighet for å starta med "Blog template".
Etter wizard var ferdig, og satte opp vite+astro boilerplate, så var det bare å kjøra `npm run dev` for dev server med HMR

Setup kom med ferdig struktur, der blogposts er definert som MD filer i repoet, ingen DB eller CMS. Siden eg skrive MD og skal bruka det personleg uansett, så vurderer eg heller ingen DB/CMS løsninger.

Kasta litt placeholder stuffs og begynte å tenka på mulighet for trunk based deployment med GH (GitHub) actions, siden eg valgte å bruka in-repo md filer for bloggpostene. Såg fort at astro har god støtte for GH Pages, som kan deployes via GH Actions.

- https://docs.astro.build/en/install/auto/
- https://docs.astro.build/en/guides/deploy/github/
