/**
 * Curator content — the museum's interpretive voice.
 *
 * This module adds the layer that turns exhibits into a curated collection:
 *   • note    — the Curator's Note ("why does this matter?"), reflective, not a summary.
 *   • memory  — an optional Memory Moment: one human, emotional line worth remembering.
 *   • sources — Sources & Further Reading, kept accessible (no academic clutter).
 *
 * Everything is OPTIONAL. Pages render a block only when content exists for that
 * exhibit, so the system layers gently over the existing experience without
 * redesigning anything. Content is keyed by exhibit type + id and pulled through
 * the getCurator() helper.
 */

import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type SourceKind = "book" | "archive" | "article" | "organization" | "museum";

export type CuratorSource = {
  kind: SourceKind;
  label: LocalizedString;
  /** Optional author / institution credit line. */
  by?: LocalizedString;
};

export type CuratorEntry = {
  /** Reflective curator's note — interpretation and insight, not a biography. */
  note?: LocalizedString;
  /** A single memorable, human highlight line. */
  memory?: LocalizedString;
  /** Accessible suggestions for further reading. */
  sources?: CuratorSource[];
};

export type CuratorEntityType =
  | "figure"
  | "era"
  | "region"
  | "collection"
  | "journey";

const book = (label: LocalizedString, by?: LocalizedString): CuratorSource => ({ kind: "book", label, by });
const archive = (label: LocalizedString, by?: LocalizedString): CuratorSource => ({ kind: "archive", label, by });
const article = (label: LocalizedString, by?: LocalizedString): CuratorSource => ({ kind: "article", label, by });
const org = (label: LocalizedString, by?: LocalizedString): CuratorSource => ({ kind: "organization", label, by });
const museum = (label: LocalizedString, by?: LocalizedString): CuratorSource => ({ kind: "museum", label, by });

// ---------------------------------------------------------------------------
// FIGURES
// ---------------------------------------------------------------------------

const figures: Record<string, CuratorEntry> = {
  abdelkader: {
    note: L(
      "Emir Abdelkader is often remembered as a resistance leader. Yet his influence extended far beyond the battlefield. His diplomacy, scholarship and humanitarian principles continue to resonate long after the conflict that made him famous.",
      "L'Émir Abdelkader est souvent perçu comme un chef de la résistance. Pourtant son influence dépassa largement le champ de bataille. Sa diplomatie, son érudition et ses principes humanitaires résonnent encore bien après le conflit qui le rendit célèbre.",
      "كثيراً ما يُذكر الأمير عبد القادر بوصفه قائد مقاومة، غير أن أثره تجاوز ساحة المعركة بكثير. فدبلوماسيته وعلمه ومبادئه الإنسانية ما زالت تتردّد أصداؤها بعد زمن طويل من الصراع الذي صنع شهرته.",
    ),
    memory: L(
      "In exile, the man who fought an empire risked his own safety to shelter thousands of strangers — proof that honour outlasts war.",
      "En exil, l'homme qui avait combattu un empire risqua sa propre sécurité pour protéger des milliers d'inconnus — preuve que l'honneur survit à la guerre.",
      "في المنفى، خاطر الرجل الذي حارب إمبراطورية بسلامته ليؤوي آلاف الغرباء — دليلٌ على أن الشرف يبقى بعد أن تنتهي الحرب.",
    ),
    sources: [
      book(L("Commander of the Faithful", "Le Commandeur des croyants", "أمير المؤمنين"), L("John W. Kiser", "John W. Kiser", "جون كيزر")),
      org(L("Emir Abdelkader Foundation", "Fondation Émir Abdelkader", "مؤسسة الأمير عبد القادر")),
    ],
  },
  massinissa: {
    note: L(
      "Long before modern borders, Massinissa imagined something audacious: a single Numidian state strong enough to stand among the powers of the Mediterranean. His reign is less about conquest than about the idea of unity itself.",
      "Bien avant les frontières modernes, Massinissa imagina une idée audacieuse : un État numide uni, assez fort pour compter parmi les puissances de la Méditerranée. Son règne parle moins de conquête que de l'idée même d'unité.",
      "قبل الحدود الحديثة بزمن طويل، تخيّل ماسينيسا فكرة جريئة: دولة نوميدية موحّدة قوية بما يكفي لتقف بين قوى المتوسط. حكمه ليس قصة فتوحات بقدر ما هو قصة فكرة الوحدة ذاتها.",
    ),
    memory: L(
      "Before Algeria existed as a modern nation, Massinissa imagined unity across the Numidian kingdoms.",
      "Avant que l'Algérie n'existe en tant que nation moderne, Massinissa rêvait d'unir les royaumes numides.",
      "قبل أن تُوجد الجزائر أمّةً حديثة، تخيّل ماسينيسا وحدةً تجمع الممالك النوميدية.",
    ),
    sources: [
      book(L("The Berbers", "Les Berbères", "الأمازيغ"), L("Michael Brett & Elizabeth Fentress", "Michael Brett et Elizabeth Fentress", "مايكل بريت وإليزابيث فنتريس")),
      archive(L("Roman accounts of the Numidian wars", "Récits romains des guerres numides", "روايات رومانية عن الحروب النوميدية")),
    ],
  },
  jugurtha: {
    note: L(
      "Jugurtha's story endures because it exposes a truth empires prefer to hide: Rome was not undone on the battlefield but at its own negotiating table. He turned resistance into a mirror held up to the powerful.",
      "L'histoire de Jugurtha perdure car elle révèle une vérité que les empires préfèrent taire : Rome ne fut pas vaincue au combat mais à sa propre table de négociation. Il fit de la résistance un miroir tendu aux puissants.",
      "تبقى قصة يوغرطة حيّة لأنها تكشف حقيقة تفضّل الإمبراطوريات إخفاءها: روما لم تُهزم في الميدان بل على طاولة مفاوضاتها. لقد جعل من المقاومة مرآةً يرفعها في وجه الأقوياء.",
    ),
    memory: L(
      "\"Rome is for sale,\" he is said to have declared — a king who fought corruption as fiercely as armies.",
      "« Rome est à vendre », aurait-il déclaré — un roi qui combattit la corruption avec autant d'ardeur que les armées.",
      "يُروى أنه قال: «روما تُباع» — ملكٌ حارب الفساد بضراوة قتاله للجيوش.",
    ),
    sources: [
      book(L("The Jugurthine War", "La Guerre de Jugurtha", "حرب يوغرطة"), L("Sallust", "Salluste", "سالوست")),
    ],
  },
  dihya: {
    note: L(
      "Remembered by many names — Dihya, Kahina — she became legend precisely because she defended a way of life, not merely a territory. Her resistance is the memory of a people refusing to disappear.",
      "Connue sous plusieurs noms — Dihya, la Kahina — elle devint légende justement parce qu'elle défendait un mode de vie, et pas seulement un territoire. Sa résistance est la mémoire d'un peuple refusant de disparaître.",
      "عُرفت بأسماء عدّة — ديهيا، الكاهنة — وصارت أسطورة لأنها دافعت عن نمط حياة لا عن أرضٍ فحسب. مقاومتها هي ذاكرة شعبٍ رفض أن يزول.",
    ),
    memory: L(
      "A queen of the Aurès who led when empires expected silence — her name still echoes through the mountains.",
      "Une reine des Aurès qui dirigea là où les empires attendaient le silence — son nom résonne encore dans les montagnes.",
      "ملكة من الأوراس قادت حيث توقّعت الإمبراطوريات الصمت — ما زال اسمها يتردّد في الجبال.",
    ),
    sources: [
      book(L("The Berbers", "Les Berbères", "الأمازيغ"), L("Michael Brett & Elizabeth Fentress", "Michael Brett et Elizabeth Fentress", "مايكل بريت وإليزابيث فنتريس")),
    ],
  },
  "lalla-fatma-nsoumer": {
    note: L(
      "Lalla Fatma N'Soumer never held political office, yet she rallied a region around faith, courage and the refusal to yield. Her authority came not from a title but from the trust of the people who followed her.",
      "Lalla Fatma N'Soumer n'occupa jamais de fonction politique, pourtant elle rassembla une région autour de la foi, du courage et du refus de céder. Son autorité ne venait pas d'un titre mais de la confiance de ceux qui la suivaient.",
      "لم تتولَّ لالة فاطمة نسومر منصباً سياسياً قط، ومع ذلك جمعت منطقة بأكملها حول الإيمان والشجاعة ورفض الاستسلام. لم تنبع سلطتها من لقب بل من ثقة من اتّبعوها.",
    ),
    memory: L(
      "Fatma N'Soumer never held political office, yet her legacy outlived empires.",
      "Fatma N'Soumer n'a jamais occupé de fonction politique, pourtant son héritage a survécu aux empires.",
      "لم تتولَّ فاطمة نسومر أيّ منصب سياسي، ومع ذلك بقي إرثها بعد زوال الإمبراطوريات.",
    ),
    sources: [
      org(L("National Museum of the Mujahid, Algiers", "Musée national du Moudjahid, Alger", "المتحف الوطني للمجاهد، الجزائر")),
    ],
  },
  "el-mokrani": {
    note: L(
      "The Mokrani Revolt was more than a rebellion; it was the moment an established notable chose his people over his privileges. His uprising marks the threshold between old loyalties and a new national consciousness.",
      "La révolte d'El Mokrani fut plus qu'une rébellion ; ce fut l'instant où un notable établi choisit son peuple plutôt que ses privilèges. Son soulèvement marque le seuil entre anciennes allégeances et conscience nationale naissante.",
      "كانت ثورة المقراني أكثر من تمرّد؛ كانت اللحظة التي اختار فيها وجيهٌ مكرّس شعبه على امتيازاته. انتفاضته تمثّل العتبة بين الولاءات القديمة ووعيٍ وطني جديد.",
    ),
    memory: L(
      "He laid down the privileges of rank to take up the cause of the dispossessed.",
      "Il renonça aux privilèges du rang pour épouser la cause des dépossédés.",
      "تخلّى عن امتيازات المكانة ليحمل قضية المحرومين.",
    ),
  },
  "abane-ramdane": {
    note: L(
      "Abane Ramdane gave the revolution a mind. He insisted that an idea, carefully organised, was more durable than any single leader — a conviction that shaped modern Algeria long after his death.",
      "Abane Ramdane donna une pensée à la révolution. Il soutenait qu'une idée, soigneusement organisée, était plus durable que n'importe quel chef — conviction qui façonna l'Algérie moderne bien après sa mort.",
      "منح عبان رمضان الثورة عقلاً. كان يؤمن بأن الفكرة المنظَّمة بعناية أبقى من أي قائد بمفرده — قناعةٌ صاغت الجزائر الحديثة بعد وفاته بزمن طويل.",
    ),
    memory: L(
      "He believed the revolution belonged to the people, not to any one commander.",
      "Il croyait que la révolution appartenait au peuple, et non à un seul chef.",
      "آمن بأن الثورة ملك للشعب لا لأي قائد بعينه.",
    ),
    sources: [
      book(L("The Battle of the Casbah", "La Bataille de la Casbah", "معركة القصبة"), L("Saâdi Yacef", "Saâdi Yacef", "سعدي ياسف")),
    ],
  },
  "ben-mhidi": {
    note: L(
      "Larbi Ben M'hidi understood that revolutions are won less by force than by belief. His calm conviction under interrogation turned a captured man into an enduring symbol of dignity.",
      "Larbi Ben M'hidi comprit que les révolutions se gagnent moins par la force que par la conviction. Son calme face à l'interrogatoire transforma un homme capturé en symbole durable de dignité.",
      "أدرك العربي بن مهيدي أن الثورات تُكسب بالإيمان أكثر من القوة. هدوؤه وثباته تحت الاستجواب حوّلا أسيراً إلى رمزٍ خالد للكرامة.",
    ),
    memory: L(
      "\"Throw the revolution into the street, and the people will carry it,\" he said — and they did.",
      "« Jetez la révolution dans la rue, et le peuple la portera », dit-il — et ce fut le cas.",
      "قال: «ألقوا بالثورة إلى الشارع يحملها الشعب» — وهذا ما كان.",
    ),
  },
  augustine: {
    note: L(
      "Augustine of Hippo belongs to Algeria as much as to the wider world. Born of this land, he turned questions of memory, doubt and meaning into a body of thought that still shapes how the West thinks about itself.",
      "Augustin d'Hippone appartient à l'Algérie autant qu'au monde. Né de cette terre, il transforma les questions de mémoire, de doute et de sens en une pensée qui façonne encore la manière dont l'Occident se conçoit.",
      "ينتمي أوغسطين الهيبوني إلى الجزائر بقدر انتمائه إلى العالم. وُلد من هذه الأرض، وحوّل أسئلة الذاكرة والشك والمعنى إلى فكرٍ ما زال يشكّل نظرة الغرب إلى نفسه.",
    ),
    memory: L(
      "From the city of Hippo on the Algerian coast, a restless mind reshaped the thought of an entire civilisation.",
      "Depuis la cité d'Hippone, sur la côte algérienne, un esprit inquiet refaçonna la pensée de toute une civilisation.",
      "من مدينة هيبو على الساحل الجزائري، أعاد عقلٌ قلق تشكيل فكر حضارة بأكملها.",
    ),
    sources: [
      book(L("Confessions", "Les Confessions", "الاعترافات"), L("Augustine of Hippo", "Augustin d'Hippone", "أوغسطين")),
    ],
  },
  "ibn-khaldun": {
    note: L(
      "Centuries before modern social science, Ibn Khaldun asked why civilisations rise and fall — and answered with a rigour the world would not match for generations. Much of his great work took shape on Algerian soil.",
      "Des siècles avant les sciences sociales modernes, Ibn Khaldoun se demanda pourquoi les civilisations s'élèvent et s'effondrent — et répondit avec une rigueur que le monde mettrait des générations à égaler. Une grande part de son œuvre prit forme sur le sol algérien.",
      "قبل العلوم الاجتماعية الحديثة بقرون، تساءل ابن خلدون لماذا تنهض الحضارات وتسقط — وأجاب بدقّةٍ لم يبلغها العالم إلا بعد أجيال. وقد تشكّل جزء كبير من عمله العظيم على أرض الجزائر.",
    ),
    memory: L(
      "In a quiet fortress near Frenda, he wrote the Muqaddimah and founded a new way of understanding history.",
      "Dans une paisible forteresse près de Frenda, il écrivit la Muqaddima et fonda une nouvelle manière de comprendre l'histoire.",
      "في قلعة هادئة قرب فرندة، كتب المقدّمة وأسّس طريقة جديدة لفهم التاريخ.",
    ),
    sources: [
      book(L("The Muqaddimah", "La Muqaddima", "المقدّمة"), L("Ibn Khaldun", "Ibn Khaldoun", "ابن خلدون")),
    ],
  },
  "kateb-yacine": {
    note: L(
      "Kateb Yacine wrote in the language of the coloniser to wage war against colonisation itself. His work insists that identity is not inherited intact but fought for, again and again, in words.",
      "Kateb Yacine écrivit dans la langue du colonisateur pour mieux combattre la colonisation. Son œuvre affirme que l'identité ne s'hérite pas intacte : elle se conquiert, encore et encore, par les mots.",
      "كتب كاتب ياسين بلغة المستعمِر ليشنّ الحرب على الاستعمار نفسه. يؤكّد عمله أن الهوية لا تُورَث كاملة، بل تُنتزع مراراً وتكراراً بالكلمات.",
    ),
    memory: L(
      "He called the French language \"the spoils of war\" — a weapon turned back on those who brought it.",
      "Il appelait la langue française « un butin de guerre » — une arme retournée contre ceux qui l'avaient apportée.",
      "وصف اللغة الفرنسية بأنها «غنيمة حرب» — سلاحٌ رُدّ على من جلبوه.",
    ),
    sources: [
      book(L("Nedjma", "Nedjma", "نجمة"), L("Kateb Yacine", "Kateb Yacine", "كاتب ياسين")),
    ],
  },
  "assia-djebar": {
    note: L(
      "Assia Djebar gave voice to those history had silenced — especially women. Her writing is an act of recovery, returning to the archive to listen for the stories left out of it.",
      "Assia Djebar donna une voix à celles que l'histoire avait fait taire — les femmes surtout. Son écriture est un acte de récupération : revenir aux archives pour écouter les récits qu'on en avait exclus.",
      "منحت آسيا جبار صوتاً لمن أسكتهم التاريخ — والنساء خاصة. كتابتها فعل استرداد: عودةٌ إلى الأرشيف للإصغاء إلى الحكايات التي أُقصيت منه.",
    ),
    memory: L(
      "The first Algerian elected to the Académie française — a woman who made silence speak.",
      "Première Algérienne élue à l'Académie française — une femme qui fit parler le silence.",
      "أول جزائرية تُنتخب في الأكاديمية الفرنسية — امرأة جعلت الصمت ينطق.",
    ),
    sources: [
      book(L("Women of Algiers in Their Apartment", "Femmes d'Alger dans leur appartement", "نساء الجزائر في شقّتهنّ"), L("Assia Djebar", "Assia Djebar", "آسيا جبار")),
    ],
  },
  matoub: {
    note: L(
      "Lounès Matoub turned song into a form of resistance. He sang what others feared to say, and paid for it — making his music inseparable from the struggle for Amazigh identity and free expression.",
      "Lounès Matoub fit de la chanson une forme de résistance. Il chantait ce que d'autres craignaient de dire, et le paya — rendant sa musique indissociable du combat pour l'identité amazighe et la liberté d'expression.",
      "حوّل لونيس معطوب الأغنية إلى شكل من أشكال المقاومة. غنّى ما خشي غيره قوله، ودفع الثمن — فصارت موسيقاه لا تنفصل عن النضال من أجل الهوية الأمازيغية وحرية التعبير.",
    ),
    memory: L(
      "The voice that refused silence — even when silence might have saved his life.",
      "La voix qui refusa le silence — même quand le silence aurait pu lui sauver la vie.",
      "الصوت الذي رفض الصمت — حتى حين كان الصمت قد ينقذ حياته.",
    ),
  },
  idir: {
    note: L(
      "With a single song, Idir carried the Kabyle lullaby to the world. His quiet artistry proved that the most local of melodies could speak a universal language.",
      "D'une seule chanson, Idir porta la berceuse kabyle au monde entier. Son art discret prouva que la plus locale des mélodies pouvait parler une langue universelle.",
      "بأغنية واحدة، حمل إيدير التهويدة القبائلية إلى العالم. أثبت فنّه الهادئ أن أكثر الألحان محليّةً قادرٌ على التحدّث بلغة كونية.",
    ),
    memory: L(
      "\"A Vava Inouva\" became the first Algerian song to travel the world — a mountain lullaby heard on every continent.",
      "« A Vava Inouva » devint la première chanson algérienne à parcourir le monde — une berceuse des montagnes entendue sur tous les continents.",
      "صارت «آفافا إينوفا» أول أغنية جزائرية تجوب العالم — تهويدةٌ جبلية سُمعت في كل القارات.",
    ),
  },
  "moufdi-zakaria": {
    note: L(
      "Moufdi Zakaria wrote a nation's faith into verse. His words became the anthem of a people — proof that poetry, in the right moment, can carry the weight of a revolution.",
      "Moufdi Zakaria mit en vers la foi d'une nation. Ses mots devinrent l'hymne d'un peuple — preuve que la poésie, au bon moment, peut porter le poids d'une révolution.",
      "صاغ مفدي زكريا إيمان أمّةٍ شعراً. صارت كلماته نشيد شعبٍ بأكمله — دليلٌ على أن الشعر، في لحظته المناسبة، قادرٌ على حمل ثِقل ثورة.",
    ),
    memory: L(
      "Tradition says he wrote \"Kassaman\" on his prison wall — the anthem of a nation born behind bars.",
      "La tradition rapporte qu'il écrivit « Kassaman » sur le mur de sa cellule — l'hymne d'une nation né derrière les barreaux.",
      "تقول الرواية إنه كتب «قسماً» على جدار زنزانته — نشيد أمّةٍ وُلد خلف القضبان.",
    ),
    sources: [
      archive(L("Algerian National Archives — anthem manuscripts", "Archives nationales algériennes — manuscrits de l'hymne", "الأرشيف الوطني الجزائري — مخطوطات النشيد")),
    ],
  },
  barbarossa: {
    note: L(
      "The Barbarossa brothers turned Algiers into a Mediterranean power. Their legacy is double-edged: feared corsairs to some, founders of an enduring Algerian state to others — a reminder that history rarely fits a single frame.",
      "Les frères Barberousse firent d'Alger une puissance méditerranéenne. Leur héritage est ambivalent : corsaires redoutés pour les uns, fondateurs d'un État algérien durable pour les autres — preuve que l'histoire entre rarement dans un seul cadre.",
      "حوّل الأخوان بربروس الجزائر إلى قوة متوسطية. إرثهما ذو حدّين: قراصنة مرهوبون عند البعض، ومؤسّسو دولة جزائرية باقية عند آخرين — تذكيرٌ بأن التاريخ نادراً ما يتّسع لإطار واحد.",
    ),
  },
  "djamila-bouhired": {
    note: L(
      "Djamila Bouhired became the face of a revolution because she embodied a generation's refusal to be afraid. Her trial turned a courtroom into a stage on which the whole world watched.",
      "Djamila Bouhired devint le visage d'une révolution parce qu'elle incarnait le refus d'une génération d'avoir peur. Son procès transforma un tribunal en scène devant le monde entier.",
      "صارت جميلة بوحيرد وجه الثورة لأنها جسّدت رفض جيلٍ كامل للخوف. حوّلت محاكمتُها قاعةَ المحكمة إلى مسرحٍ يتابعه العالم بأسره.",
    ),
    memory: L(
      "A young woman whose courage on trial made the world look — and listen.",
      "Une jeune femme dont le courage au procès fit que le monde regarda — et écouta.",
      "شابّة جعلت شجاعتُها أثناء المحاكمة العالمَ ينظر — ويُصغي.",
    ),
  },
  "frantz-fanon": {
    note: L(
      "Frantz Fanon arrived in Algeria as a doctor and left as one of the great theorists of liberation. He understood colonisation as a wound to the mind as much as the body — and made Algeria's struggle speak to the whole colonised world.",
      "Frantz Fanon arriva en Algérie comme médecin et en repartit comme l'un des grands théoriciens de la libération. Il comprit la colonisation comme une blessure de l'esprit autant que du corps — et fit parler la lutte algérienne au monde colonisé tout entier.",
      "وصل فرانز فانون إلى الجزائر طبيباً وغادرها واحداً من كبار منظّري التحرّر. أدرك الاستعمار جرحاً يصيب العقل بقدر ما يصيب الجسد — وجعل نضال الجزائر يخاطب العالم المستعمَر بأسره.",
    ),
    sources: [
      book(L("The Wretched of the Earth", "Les Damnés de la terre", "معذّبو الأرض"), L("Frantz Fanon", "Frantz Fanon", "فرانز فانون")),
    ],
  },
};

// ---------------------------------------------------------------------------
// ERAS  (keyed by era id in src/data/eras.ts)
// ---------------------------------------------------------------------------

const eras: Record<string, CuratorEntry> = {
  numidia: {
    note: L(
      "The Numidian era matters because it shows Algeria as an active maker of Mediterranean history, not a backdrop to it. Here, North African kings negotiated, fought and ruled as equals of Rome and Carthage.",
      "L'ère numide compte parce qu'elle montre l'Algérie comme actrice de l'histoire méditerranéenne, et non comme un décor. Ici, des rois nord-africains négociaient, combattaient et régnaient en égaux de Rome et de Carthage.",
      "يهمّ العصر النوميدي لأنه يُظهر الجزائر صانعةً فاعلة لتاريخ المتوسط لا خلفيةً له. فهنا تفاوض ملوك شمال إفريقيا وحاربوا وحكموا نِداً لروما وقرطاج.",
    ),
    memory: L(
      "The first dream of a united North African kingdom was born here, in the hands of Numidian kings.",
      "Le premier rêve d'un royaume nord-africain uni naquit ici, entre les mains des rois numides.",
      "وُلد هنا أول حلمٍ بمملكة موحّدة في شمال إفريقيا، على أيدي الملوك النوميديين.",
    ),
    sources: [
      book(L("The Berbers", "Les Berbères", "الأمازيغ"), L("Michael Brett & Elizabeth Fentress", "Michael Brett et Elizabeth Fentress", "مايكل بريت وإليزابيث فنتريس")),
    ],
  },
  roman: {
    note: L(
      "Roman Algeria was never simply Roman. Beneath the temples and roads, North African voices — thinkers, saints and rebels — shaped the empire as much as they were shaped by it.",
      "L'Algérie romaine ne fut jamais seulement romaine. Sous les temples et les routes, des voix nord-africaines — penseurs, saints et rebelles — façonnèrent l'empire autant qu'elles en furent façonnées.",
      "لم تكن الجزائر الرومانية رومانية خالصة قط. فتحت المعابد والطرق، صاغت أصواتٌ من شمال إفريقيا — مفكرون وقديسون وثوار — الإمبراطورية بقدر ما صاغتهم.",
    ),
    memory: L(
      "The ruins of Timgad and Djemila still stand — a Roman world built on African ground.",
      "Les ruines de Timgad et Djemila tiennent encore debout — un monde romain bâti sur une terre africaine.",
      "ما زالت أطلال تيمقاد وجميلة قائمة — عالمٌ روماني بُني على أرضٍ إفريقية.",
    ),
  },
  islamic: {
    note: L(
      "The Islamic and medieval centuries gave Algeria a new language of faith, law and learning — woven into, rather than over, its older Amazigh foundations. It is an era of synthesis, not replacement.",
      "Les siècles islamiques et médiévaux donnèrent à l'Algérie un nouveau langage de foi, de droit et de savoir — tissé avec, et non par-dessus, ses fondations amazighes plus anciennes. C'est une ère de synthèse, pas de remplacement.",
      "منحت القرون الإسلامية والوسيطة الجزائر لغةً جديدة في الإيمان والشريعة والعلم — نُسجت مع أسسها الأمازيغية الأقدم لا فوقها. إنه عصر امتزاجٍ لا إحلال.",
    ),
    memory: L(
      "In its mosques and libraries, scholars carried knowledge across the Mediterranean and the Sahara alike.",
      "Dans ses mosquées et ses bibliothèques, les savants firent circuler le savoir à travers la Méditerranée comme le Sahara.",
      "في مساجدها ومكتباتها، نقل العلماء المعرفة عبر المتوسط والصحراء على حدٍّ سواء.",
    ),
  },
  ottoman: {
    note: L(
      "The Ottoman period made Algiers a self-governing Mediterranean power with its own navy, diplomacy and identity. Far from a distant province, it was a state learning to act on its own terms.",
      "La période ottomane fit d'Alger une puissance méditerranéenne autonome, dotée de sa propre marine, de sa diplomatie et de son identité. Loin d'une province lointaine, c'était un État apprenant à agir selon ses propres règles.",
      "جعل العهد العثماني الجزائر قوة متوسطية تحكم نفسها بأسطولها ودبلوماسيتها وهويتها. لم تكن ولايةً نائية بل دولةً تتعلّم التصرّف وفق شروطها.",
    ),
    memory: L(
      "For three centuries, the Regency of Algiers set its own course on the Mediterranean.",
      "Trois siècles durant, la Régence d'Alger traça sa propre route en Méditerranée.",
      "طوال ثلاثة قرون، رسمت إيالة الجزائر مسارها الخاص في المتوسط.",
    ),
  },
  french: {
    note: L(
      "The colonial era is not only a story of loss but of endurance. Through dispossession and resistance alike, Algerians preserved a sense of self that occupation could never fully erase.",
      "L'ère coloniale n'est pas seulement une histoire de perte mais d'endurance. À travers la dépossession comme la résistance, les Algériens préservèrent un sentiment d'eux-mêmes que l'occupation ne put jamais effacer.",
      "ليس العهد الاستعماري قصة فقدانٍ فحسب بل قصة صمود. فعبر المصادرة والمقاومة معاً، حافظ الجزائريون على إحساسٍ بذاتهم لم يستطع الاحتلال محوه يوماً.",
    ),
    memory: L(
      "Through a century of occupation, a people kept alive the memory of who they were.",
      "À travers un siècle d'occupation, un peuple garda vivante la mémoire de ce qu'il était.",
      "عبر قرنٍ من الاحتلال، أبقى شعبٌ ذاكرةَ هويته حيّة.",
    ),
  },
  independence: {
    note: L(
      "The War of Independence is remembered for its battles, but its deepest legacy is an idea: that a people could reclaim the right to write their own history. Its sacrifices still define how Algeria sees itself.",
      "La guerre d'indépendance est connue pour ses batailles, mais son héritage le plus profond est une idée : qu'un peuple pouvait reconquérir le droit d'écrire sa propre histoire. Ses sacrifices définissent encore l'image que l'Algérie a d'elle-même.",
      "تُذكر حرب الاستقلال بمعاركها، لكن أعمق إرثها فكرة: أن شعباً يستطيع استعادة حقّه في كتابة تاريخه بنفسه. وما زالت تضحياتها تحدّد كيف ترى الجزائر نفسها.",
    ),
    memory: L(
      "On 1 November 1954, a single night of fire announced that a nation had decided to be free.",
      "Le 1ᵉʳ novembre 1954, une seule nuit de feu annonça qu'une nation avait décidé d'être libre.",
      "في الفاتح من نوفمبر 1954، أعلنت ليلةٌ واحدة من اللهب أن أمّةً قرّرت أن تكون حرّة.",
    ),
    sources: [
      book(L("A Savage War of Peace", "Une sale guerre", "حرب سلام وحشية"), L("Alistair Horne", "Alistair Horne", "أليستير هورن")),
      org(L("National Museum of the Mujahid, Algiers", "Musée national du Moudjahid, Alger", "المتحف الوطني للمجاهد، الجزائر")),
    ],
  },
};

// ---------------------------------------------------------------------------
// REGIONS  (keyed by region id in src/data/mapRegions.ts)
// ---------------------------------------------------------------------------

const regions: Record<string, CuratorEntry> = {
  kabylie: {
    note: L(
      "Kabylie's mountains did more than shelter people; they sheltered a language and a memory. To understand this region is to understand how geography can become a guardian of identity.",
      "Les montagnes de Kabylie ne protégèrent pas seulement des hommes ; elles protégèrent une langue et une mémoire. Comprendre cette région, c'est comprendre comment la géographie peut devenir gardienne d'une identité.",
      "لم تحمِ جبال القبائل البشر فحسب؛ بل حمت لغةً وذاكرة. أن تفهم هذه المنطقة يعني أن تفهم كيف تصبح الجغرافيا حارسةً للهوية.",
    ),
    memory: L(
      "Mountains that kept a language alive when the world tried to forget it.",
      "Des montagnes qui maintinrent une langue en vie quand le monde tentait de l'oublier.",
      "جبالٌ أبقت لغةً حيّة حين حاول العالم نسيانها.",
    ),
  },
  aures: {
    note: L(
      "The Aurès has been the cradle of resistance across millennia — from Dihya's mountain stand to the first shots of 1954. Its terrain seems to remember every refusal to surrender.",
      "Les Aurès furent le berceau de la résistance à travers les millénaires — du combat de Dihya aux premiers coups de feu de 1954. Son relief semble se souvenir de chaque refus de se rendre.",
      "كانت الأوراس مهد المقاومة عبر آلاف السنين — من صمود ديهيا في الجبال إلى أولى رصاصات 1954. وكأن تضاريسها تتذكّر كل رفضٍ للاستسلام.",
    ),
    memory: L(
      "Where the fire of revolution was first lit, on the night of 1 November 1954.",
      "Là où le feu de la révolution fut allumé pour la première fois, dans la nuit du 1ᵉʳ novembre 1954.",
      "حيث أُشعلت نار الثورة لأول مرة، ليلة الفاتح من نوفمبر 1954.",
    ),
  },
  algiers: {
    note: L(
      "Algiers has always been a threshold — between sea and land, empires and independence. Its Casbah holds, in a single hillside, the layered memory of everyone who ruled and resisted here.",
      "Alger a toujours été un seuil — entre mer et terre, empires et indépendance. Sa Casbah renferme, sur un seul versant, la mémoire stratifiée de tous ceux qui y ont régné et résisté.",
      "كانت الجزائر العاصمة دائماً عتبة — بين البحر والبرّ، بين الإمبراطوريات والاستقلال. تحتفظ قصبتها، على منحدرٍ واحد، بذاكرةٍ متراكمة لكل من حكم هنا وقاوم.",
    ),
    memory: L(
      "In the alleys of the Casbah, the Battle of Algiers turned a city into a symbol.",
      "Dans les ruelles de la Casbah, la Bataille d'Alger transforma une ville en symbole.",
      "في أزقّة القصبة، حوّلت معركة الجزائر مدينةً إلى رمز.",
    ),
  },
  constantine: {
    note: L(
      "Suspended over its gorges, Constantine has been a city of scholars and bridges — literal and intellectual. It reminds us that Algerian history was written in libraries as much as on battlefields.",
      "Suspendue au-dessus de ses gorges, Constantine fut une ville de savants et de ponts — au sens propre comme intellectuel. Elle rappelle que l'histoire algérienne s'écrivit dans les bibliothèques autant que sur les champs de bataille.",
      "معلّقةً فوق أخاديدها، كانت قسنطينة مدينة العلماء والجسور — بالمعنى الحسّي والفكري. تذكّرنا بأن تاريخ الجزائر كُتب في المكتبات بقدر ما كُتب في ساحات المعارك.",
    ),
    memory: L(
      "A city of bridges, where learning crossed every divide.",
      "Une ville de ponts, où le savoir franchissait toutes les divisions.",
      "مدينة الجسور، حيث عبَر العلمُ كل الفواصل.",
    ),
  },
  "oran-west": {
    note: L(
      "The west of Algeria is where many currents meet — Andalusian, Saharan, Mediterranean. From this crossroads came raï, a music that turned everyday life into something the whole world could sing.",
      "L'ouest de l'Algérie est un point de rencontre de courants multiples — andalou, saharien, méditerranéen. De ce carrefour naquit le raï, une musique qui transforma le quotidien en chant universel.",
      "غرب الجزائر مُلتقى تيّاراتٍ عديدة — أندلسية وصحراوية ومتوسطية. من هذا المفترق وُلد الراي، موسيقى حوّلت تفاصيل الحياة اليومية إلى أغنيةٍ يردّدها العالم.",
    ),
    memory: L(
      "Oran gave the world raï — the sound of a city that refused to stop singing.",
      "Oran offrit au monde le raï — le son d'une ville qui refusa de cesser de chanter.",
      "أهدت وهران العالمَ الراي — صوت مدينةٍ رفضت أن تكفّ عن الغناء.",
    ),
  },
  sahara: {
    note: L(
      "The Sahara is not empty space but a world of its own — of oases, caravans and rock art older than the pyramids. It connected Algeria to Africa long before any map drew the link.",
      "Le Sahara n'est pas un vide mais un monde à part entière — d'oasis, de caravanes et d'un art rupestre plus ancien que les pyramides. Il relia l'Algérie à l'Afrique bien avant qu'aucune carte ne trace ce lien.",
      "ليست الصحراء فراغاً بل عالماً قائماً بذاته — واحاتٌ وقوافل وفنٌّ صخري أقدم من الأهرامات. لقد ربطت الجزائر بإفريقيا قبل أن ترسم أي خريطة هذا الرابط.",
    ),
    memory: L(
      "On the rocks of Tassili, hands from nine thousand years ago still tell their story.",
      "Sur les roches du Tassili, des mains vieilles de neuf mille ans racontent encore leur histoire.",
      "على صخور الطاسيلي، ما زالت أيادٍ عمرها تسعة آلاف عام تروي حكايتها.",
    ),
    sources: [
      org(L("Tassili n'Ajjer — UNESCO World Heritage", "Tassili n'Ajjer — patrimoine mondial de l'UNESCO", "طاسيلي ناجر — تراث عالمي لليونسكو")),
    ],
  },
};

// ---------------------------------------------------------------------------
// COLLECTIONS  (keyed by discovery-row id in src/lib/figureDiscovery.ts)
// ---------------------------------------------------------------------------

const collections: Record<string, CuratorEntry> = {
  resistance: {
    note: L(
      "Resistance in Algeria was never a single act but a centuries-long thread. This gallery gathers those who, in very different eras, all answered the same question: what is worth standing for?",
      "La résistance en Algérie ne fut jamais un acte isolé mais un fil long de plusieurs siècles. Cette galerie réunit ceux qui, à des époques très différentes, répondirent tous à la même question : pour quoi vaut-il la peine de se dresser ?",
      "لم تكن المقاومة في الجزائر فعلاً واحداً بل خيطاً يمتدّ قروناً. تجمع هذه القاعة من أجابوا جميعاً، في عصورٍ مختلفة، على السؤال نفسه: ما الذي يستحقّ أن نقف من أجله؟",
    ),
  },
  women: {
    note: L(
      "The women in this gallery rarely held official power, yet they shaped Algeria as deeply as any ruler. Their stories correct an old habit of history: remembering the throne and forgetting those who held the line.",
      "Les femmes de cette galerie détinrent rarement un pouvoir officiel, pourtant elles façonnèrent l'Algérie aussi profondément que n'importe quel dirigeant. Leurs récits corrigent une vieille habitude de l'histoire : se souvenir du trône et oublier celles qui tinrent bon.",
      "نادراً ما تولّت نساء هذه القاعة سلطةً رسمية، ومع ذلك صغن الجزائر بعمقٍ لا يقلّ عن أي حاكم. تصحّح حكاياتهنّ عادةً قديمة في التاريخ: تذكُّر العرش ونسيان من ثبتن في الصفوف.",
    ),
  },
  thinkers: {
    note: L(
      "Ideas have always been one of Algeria's great exports. From Augustine to Ibn Khaldun to the writers of the twentieth century, these minds shaped how the world understands faith, society and freedom.",
      "Les idées ont toujours été l'une des grandes exportations de l'Algérie. D'Augustin à Ibn Khaldoun jusqu'aux écrivains du XXe siècle, ces esprits façonnèrent la manière dont le monde comprend la foi, la société et la liberté.",
      "كانت الأفكار دائماً من أعظم ما صدّرته الجزائر. من أوغسطين إلى ابن خلدون إلى كُتّاب القرن العشرين، صاغ هؤلاء العقول كيف يفهم العالم الإيمان والمجتمع والحرية.",
    ),
  },
  revolutionaries: {
    note: L(
      "This gallery holds the generation that turned a dream of independence into an organised reality. Together they remind us that revolutions are built not by lone heroes but by people who choose to act in concert.",
      "Cette galerie rassemble la génération qui transforma un rêve d'indépendance en réalité organisée. Ensemble, ils rappellent que les révolutions ne se construisent pas par des héros solitaires mais par ceux qui choisissent d'agir de concert.",
      "تضمّ هذه القاعة الجيل الذي حوّل حلم الاستقلال إلى واقعٍ منظَّم. وهم معاً يذكّروننا بأن الثورات لا يبنيها أبطالٌ منفردون بل من يختارون العمل معاً.",
    ),
  },
};

// ---------------------------------------------------------------------------
// JOURNEYS  (keyed by journey id in src/lib/journeys.ts)
// ---------------------------------------------------------------------------

const journeys: Record<string, CuratorEntry> = {
  "grand-tour": {
    note: L(
      "The Grand Tour is designed as a first conversation with Algerian history — a curated path that connects a figure, an era and a region so the whole collection begins to feel like one story.",
      "La Grande Visite est conçue comme une première conversation avec l'histoire algérienne — un parcours qui relie une figure, une époque et une région pour que la collection entière commence à ressembler à une seule histoire.",
      "صُمّمت الجولة الكبرى لتكون أول حوارٍ مع تاريخ الجزائر — مسارٌ يربط شخصيةً وعصراً ومنطقة حتى تبدأ المجموعة كلها كأنها قصة واحدة.",
    ),
  },
  "massinissa-to-modern": {
    note: L(
      "Spanning more than two thousand years, this journey traces a single question across the ages: what does it mean to be a nation? From Numidian kings to the modern republic, the answer keeps being rewritten.",
      "S'étendant sur plus de deux mille ans, ce parcours suit une seule question à travers les âges : qu'est-ce qu'être une nation ? Des rois numides à la république moderne, la réponse ne cesse d'être réécrite.",
      "يمتدّ هذا المسار أكثر من ألفي عام ليتتبّع سؤالاً واحداً عبر العصور: ما معنى أن تكون أمّة؟ من الملوك النوميديين إلى الجمهورية الحديثة، تُعاد كتابة الجواب مراراً.",
    ),
    sources: [
      book(L("The Berbers", "Les Berbères", "الأمازيغ"), L("Michael Brett & Elizabeth Fentress", "Michael Brett et Elizabeth Fentress", "مايكل بريت وإليزابيث فنتريس")),
    ],
  },
  "women-who-shaped-algeria": {
    note: L(
      "This journey gathers women whose courage outlasted the empires that tried to silence them — from warrior queens to writers. Together they tell a history too often left in the margins.",
      "Ce parcours réunit des femmes dont le courage survécut aux empires qui tentèrent de les faire taire — des reines guerrières aux écrivaines. Ensemble, elles racontent une histoire trop souvent reléguée aux marges.",
      "يجمع هذا المسار نساءً تجاوزت شجاعتُهنّ الإمبراطوريات التي حاولت إسكاتهنّ — من ملكاتٍ محاربات إلى كاتبات. وهنّ معاً يروين تاريخاً طالما تُرك على الهامش.",
    ),
  },
  "spirit-of-resistance": {
    note: L(
      "From Jugurtha to the revolution, this journey follows resistance as a living tradition — each generation handing the next not just a struggle, but a conviction that dignity is worth any price.",
      "De Jugurtha à la révolution, ce parcours suit la résistance comme une tradition vivante — chaque génération transmettant à la suivante non seulement un combat, mais la conviction que la dignité vaut tous les prix.",
      "من يوغرطة إلى الثورة، يتتبّع هذا المسار المقاومة بوصفها تقليداً حيّاً — يسلّم كل جيلٍ التالي ليس نضالاً فحسب، بل قناعةً بأن الكرامة تستحقّ أي ثمن.",
    ),
  },
  "amazigh-heritage": {
    note: L(
      "This journey follows the oldest thread in Algeria's story — the Amazigh world — across language, mountains, scholarship and song. It is a reminder that some identities are far older than any border.",
      "Ce parcours suit le fil le plus ancien de l'histoire algérienne — le monde amazigh — à travers la langue, les montagnes, le savoir et la chanson. Un rappel que certaines identités sont bien plus anciennes que toute frontière.",
      "يتتبّع هذا المسار أقدم خيطٍ في حكاية الجزائر — العالم الأمازيغي — عبر اللغة والجبال والعلم والأغنية. إنه تذكيرٌ بأن بعض الهويات أقدم بكثير من أي حدود.",
    ),
  },
  "voices-of-the-sahara": {
    note: L(
      "The Sahara is often imagined as silence, yet it has always been full of voices — of poets, traders and those who defended it. This journey listens to a desert that shaped a nation.",
      "Le Sahara est souvent imaginé comme silence, pourtant il a toujours été plein de voix — de poètes, de marchands et de ceux qui le défendirent. Ce parcours écoute un désert qui façonna une nation.",
      "كثيراً ما يُتصوَّر الصحراء صمتاً، لكنها كانت دائماً مليئة بالأصوات — أصوات الشعراء والتجار ومن دافعوا عنها. يُصغي هذا المسار إلى صحراءٍ صاغت أمّة.",
    ),
  },
};

// ---------------------------------------------------------------------------
// Lookup
// ---------------------------------------------------------------------------

const TABLES: Record<CuratorEntityType, Record<string, CuratorEntry>> = {
  figure: figures,
  era: eras,
  region: regions,
  collection: collections,
  journey: journeys,
};

/** Curator content for an exhibit, or undefined when none is curated yet. */
export function getCurator(type: CuratorEntityType, id: string): CuratorEntry | undefined {
  return TABLES[type]?.[id];
}

/** Short uppercase label for a source kind. */
export const SOURCE_KIND_LABEL: Record<SourceKind, LocalizedString> = {
  book: L("Book", "Livre", "كتاب"),
  archive: L("Archive", "Archive", "أرشيف"),
  article: L("Article", "Article", "مقال"),
  organization: L("Organization", "Organisation", "مؤسسة"),
  museum: L("Museum", "Musée", "متحف"),
};
