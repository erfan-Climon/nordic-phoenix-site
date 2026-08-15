# Bildprompter för bloggens tolv artiklar

Underlag för att generera artikelbilder i ChatGPT. En bild per artikel, i samma
stil som kundens persiska bildserie: fotograferade tryckta kort på strukturerad
yta, äkta material och en orange kantlist.

## Läs det här först

**Ingen logga i prompten.** Bildmodeller kan inte återskapa Nordic Phoenix
fenix troget. Du får en annan fågel varje gång. Generera scenen ren, så läggs
den riktiga loggfilen på efteråt i stället. Då blir märket identiskt på alla
tolv bilderna.

**Ingen text i bilden.** Referensbilden har text, men artikelbilderna kan inte
ha det: samma bildfil ligger på både den svenska och den persiska versionen av
varje artikel. Persisk text skulle stå mitt på den svenska sidan. Modellen vill
gärna fylla korten med bokstäver ändå, så förbudet står med i stilblocket och
behöver stå kvar.

**Format:** välj liggande i ChatGPT, alltså 1536 × 1024. Det är exakt 3:2 och
räcker gott: bilden visas som mest 900 px bred på sajten.

**Komposition:** håll motivet i mittenbandet. På blogglistan beskärs bilden
till en smal remsa på 600 × 220, och då försvinner översta och nedersta
tredjedelen. Håll de ytorna lugna.

## Stilblock

Klistra in det här före varje enskild prompt. Det bär hela stilen. Färgerna är
hämtade ur sajtens egna designtokens.

```
An overhead editorial still life, photographed with a real camera, in the style
of premium Scandinavian print design.

Physical printed cards of thick uncoated paper in warm ivory and cream
(#F2EDE5, #EFEAE1) rest on a textured warm greige surface with visible plaster
and paper grain. The cards are genuinely physical: you can see the fibre in the
stock, the slightly soft cut edges, and the real depth as they lift off the
surface. Each card casts a soft, believable drop shadow. A narrow vertical bar
of saturated warm orange (#F06700) runs along the leading edge of the cards,
like a printed spine.

Lighting is soft and diffuse from the upper left, with gentle directional
shadows and no harsh highlights. Warm neutral palette throughout: greige,
ivory, bone, oat, with orange as the single accent colour and nothing else
saturated.

It must read as a photograph of real objects, not as a flat digital graphic or
a 3D render. Tactile, matte, slightly imperfect. Shallow to moderate depth of
field.

Strict rules: absolutely no text, no letters, no numbers, no glyphs, no
handwriting, no logos, no watermarks. The cards are completely blank. No human
faces. Hands are allowed only where specified. No icons, no charts, no
infographic elements.

Landscape 3:2. Keep the top third and bottom third of the frame visually quiet,
with the composition centred in the middle horizontal band.
```

## De tolv prompterna

Prompterna står på engelska. Bildmodeller är tränade övervägande på engelska
och tolkar dem mer exakt än svenska.

Kompositionen varieras medvetet mellan artiklarna, så att de tolv bilderna inte
blir tolv versioner av samma bild. Ordningen på korten, materialet i kanterna
och kameravinkeln bär skillnaden.

### 1. Ekonomisk höststart på 60 minuter
`/blogg/ekonomisk-halsokontroll-foretag`

```
Seven blank ivory cards laid out in a loose descending stagger across the
frame, each with an orange edge bar, as if a short checklist has just been
dealt out. A folded oatmeal linen cloth enters from the top left corner and a
matte ceramic cup sits at the far right edge, cropped. Early, low morning light
from the left. The mood is a quiet hour set aside before the day starts.
```

### 2. Enskild firma eller aktiebolag
`/blogg/enskild-firma-eller-aktiebolag`

```
Two separate stacks of blank cream cards placed symmetrically left and right on
the greige surface, with a clear empty channel of bare texture between them.
The left stack is thin and slightly loose, the right stack is thicker and
squared off. Only the right stack carries the orange edge bar. A single matte
black pen lies in the gap between them, angled diagonally. Even, calm overhead
light. The empty channel is the subject.
```

### 3. Nya 3:12-reglerna
`/blogg/nya-3-12-regler-2026`

```
Four blank ivory cards arranged as four clean horizontal bands stacked one
above the other, each with an orange edge bar, evenly spaced and slightly
raised off the surface with real shadow underneath. To the right, a dark
oxblood leather-bound ledger lies closed and cropped by the frame edge, with a
heavy black fountain pen resting on it. Warm side light. Formal and composed,
the feeling of a structure being set out.
```

### 4. Skatteplanering före årsskiftet
`/blogg/skatteplanering-infor-arsskiftet`

```
A grid of small blank cream cards arranged like a bare month calendar, with the
last few cards in the lower right lifted and slightly askew, one of them turned
face down. An orange edge bar runs along the final row. A folded wool throw in
warm grey enters from the bottom left. The light is late and low, warm and
directional from the right, with longer shadows than the other images. A sense
of a year closing.
```

### 5. Bokslut utan panik
`/blogg/bokslut-checklista`

```
Ten blank ivory cards fanned into a neat overlapping arc, each edge showing a
sliver of orange, the whole arc pressed under a matte black bulldog clip at the
left. Beside it, a shallow bone-coloured paper tray holds a second squared-off
stack. Bare greige surface elsewhere. Crisp overhead light, tidy shadows. The
image is about order restored, not about clutter.
```

### 6. K2 och K3 efter regeländringarna
`/blogg/k2-k3-nya-regler-2026`

```
Two blank card stacks of noticeably different thickness standing on their long
edges, side by side and slightly separated, photographed from a low
three-quarter angle so their height is visible. Both have orange spine bars,
the taller one wider. A thin orange ribbon marker trails from between the pages
of the taller stack onto the surface. Raking light from the left throws the two
different heights into relief. Architectural and precise.
```

### 7. Anställa första medarbetaren
`/blogg/anstalla-forsta-medarbetaren-vaxa-stod`

```
A row of blank ivory cards with orange edge bars occupies the left half of the
frame, tightly and evenly arranged. The right half is deliberately near empty:
bare greige surface, with a single blank card set apart and squared up on its
own, waiting, its orange bar catching the light. A folded natural linen cloth
sits at the top edge. Soft morning light. The empty space is the point.
```

### 8. Deklaration för enskild firma och aktiebolag
`/blogg/deklaration-enskild-firma-aktiebolag`

```
Three blank card stacks placed apart on the surface in a wide triangle, evenly
spaced, each in a different paper tone: warm ivory, pale grey and cream. Each
has an orange edge bar of a slightly different width. Photographed straight
down with clean, even daylight and crisp separate shadows, so it is
unmistakable that these are three distinct things and not one. Bare textured
surface between them.
```

### 9. Avdrag som företagare ofta gör fel på
`/blogg/avdrag-foretag-vanliga-fel`

```
A loose scatter of small blank cream cards of varying sizes across the surface,
some overlapping, some face down, as if receipts have been tipped out and are
being sorted. A pair of hands enters from the bottom of the frame, squaring a
few of them into a neat pile with an orange edge bar. The unsorted ones remain
scattered around. Soft window light from the left. The contrast between sorted
and unsorted carries the image.
```

### 10. Moms utan gissningar
`/blogg/moms-for-smaforetag`

```
Three blank ivory cards of clearly different heights standing upright in a
shallow oat-coloured paper holder, like three tiers side by side, each with an
orange edge bar of different depth. A narrow blank paper strip curls out from
beneath the holder onto the surface, like a receipt tail. Warm indoor light,
matte black holder base. Simple, calm, and clearly about three different
levels.
```

### 11. Likviditetsbudget på tretton veckor
`/blogg/likviditetsbudget-13-veckor`

```
Thirteen small blank cards laid out in a single long horizontal row across the
full width of the frame, evenly spaced, all pale ivory except one near the
right which is turned slightly out of line and carries a bright orange edge. A
hand enters from the top right, fingertips just touching that card as if about
to move it. The greige surface is otherwise bare. Even, cool daylight with soft
shadows under each card. A sense of looking ahead along a line of time.
```

### 12. Digital bokföring och säker arkivering
`/blogg/spara-bokforing-kvitton-digitalt`

```
A neat squared stack of blank cream cards on the left, mid-transition into a
second identical stack on the right that is slightly translucent, cooler in
tone and lifted higher off the surface, casting a lighter shadow, as if the
same object exists twice. An orange edge bar runs along both. A small matte
black external drive sits between them, cropped low. Clean, even light. Paper
becoming something else.
```

## När bilderna är klara

Skicka de tolv filerna som JPG eller PNG i original. Då lägger jag på loggan,
konverterar till webp, komprimerar och kopplar rätt bild till rätt artikel.

Blir en bild fel går den att generera om ensam. Prompterna är oberoende av
varandra.

Vill du i stället ha text i bilderna behövs 24 bilder, en per språk och artikel,
och då kopplar jag bild per språk i `content/blog-copy.ts`. Säg till, det är en
liten ändring.
