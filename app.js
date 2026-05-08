const STORAGE_KEY = "tela-state-v1";
const SCREENS = ["home", "closet", "inspo", "explore", "profile"];
const PROMPT_MESSAGES = [
  "Show the real fit. No staging, no second-guessing.",
  "Quick mirror check: post what you're actually wearing.",
  "Capture the outfit before the day changes it.",
  "Fit check is live. Tag the pieces you're wearing."
];

const COLOR_MAP = {
  black: "#1f1f1f",
  charcoal: "#46494d",
  gray: "#8d9096",
  grey: "#8d9096",
  white: "#f4f1eb",
  cream: "#efe3cf",
  ecru: "#ece0c9",
  navy: "#23324f",
  blue: "#4d7ea8",
  olive: "#687b45",
  moss: "#6f8160",
  green: "#5c8158",
  orange: "#ef7a1b",
  mandarin: "#ff812e",
  sand: "#c8b08a",
  tan: "#b28a63",
  brown: "#72533a",
  pine: "#355246",
  stonewash: "#7b92ad",
  plum: "#704464",
  red: "#bc5645",
  silver: "#b0b7c0"
};

const STYLE_PRESETS = {
  gorpcore: {
    label: "Gorpcore",
    musePool: ["Frank Ocean-coded", "Syd-coded", "A$AP Rocky-coded"],
    titlePool: ["Trail Heat", "Summit in the City", "Bright Weather Armor"],
    palette: ["#f36f21", "#22324d", "#f7e7d2"],
    accents: ["#7eab6e", "#dbe6f1", "#ffbc6a"],
    jacketColor: "#f68a1f",
    pantsColor: "#42505c",
    hatColor: "#273958",
    shoeColor: "#d7d0bf",
    pieces: [
      "Graphic beanie",
      "Volcanic orange puffer",
      "Technical cargos",
      "Trail runners",
      "Crossbody sling"
    ],
    narrative:
      "Outdoor texture with city sharpness. Let one loud layer carry the outfit and keep the rest grounded."
  },
  "soft-tailoring": {
    label: "Soft tailoring",
    musePool: ["Donald Glover-coded", "Tyler, The Creator-coded", "Solange-coded"],
    titlePool: ["Soft Shoulder", "Gallery Opening Ease", "Tailored Air"],
    palette: ["#ddc2a7", "#59453b", "#f7f4ef"],
    accents: ["#8a6a57", "#e4d3bb", "#2f3d52"],
    jacketColor: "#d7baa0",
    pantsColor: "#5b4438",
    hatColor: "#f2ede2",
    shoeColor: "#d8cab0",
    pieces: ["Relaxed blazer", "Cream knit", "Wide trousers", "Leather loafer", "Slim scarf"],
    narrative:
      "Clean lines with easy drape. The energy is polished but never stiff."
  },
  "art-school": {
    label: "Art-school layers",
    musePool: ["Dev Hynes-coded", "FKA twigs-coded", "Tilda Swinton-coded"],
    titlePool: ["Studio Uniform", "Intentional Layers", "Color Theory"],
    palette: ["#6c495b", "#d9bf8b", "#283245"],
    accents: ["#f4e8d3", "#95a476", "#cb7f4f"],
    jacketColor: "#6d4d61",
    pantsColor: "#d8bf8c",
    hatColor: "#283245",
    shoeColor: "#2d2b30",
    pieces: ["Painted overshirt", "Striped knit", "Pleated trouser", "Creeper shoes", "Silver ring stack"],
    narrative:
      "A studied mix of texture and proportion. The point is to look assembled, not perfect."
  },
  "minimal-street": {
    label: "Minimal street",
    musePool: ["Phoebe Philo-coded", "Ayo Edebiri-coded", "The Row energy"],
    titlePool: ["Quiet Rotation", "Off-Duty Uniform", "Sharp Neutrals"],
    palette: ["#f2ede7", "#24282d", "#9ca0a1"],
    accents: ["#ded6cc", "#6f7a80", "#3c474c"],
    jacketColor: "#f0ece4",
    pantsColor: "#2b3036",
    hatColor: "#929698",
    shoeColor: "#efebe2",
    pieces: ["Boxy coat", "Crisp tee", "Straight trouser", "Clean sneaker", "Structured tote"],
    narrative:
      "Neutral, precise, and easy to repeat. The silhouette does the work."
  },
  "after-dark": {
    label: "After-dark dress up",
    musePool: ["Rosalia-coded", "Bad Bunny-coded", "Rihanna-coded"],
    titlePool: ["Late Reservation", "Night Signal", "Gloss and Shadow"],
    palette: ["#17171b", "#5b2b3f", "#d2b593"],
    accents: ["#f1ded0", "#8f5067", "#2f3343"],
    jacketColor: "#1d1d21",
    pantsColor: "#5b2b3f",
    hatColor: "#d2b593",
    shoeColor: "#111216",
    pieces: ["Long coat", "Mesh or silk base", "Sharp trouser", "Glossy boot", "Silver earrings"],
    narrative:
      "Low light, high contrast. Smooth textures and one reflective detail make it feel finished."
  }
};

const app = {
  splashScreen: document.querySelector("#splash-screen"),
  authScreen: document.querySelector("#auth-screen"),
  authForm: document.querySelector("#auth-form"),
  appShell: document.querySelector("#app-shell"),
  nav: document.querySelector("#app-nav"),
  screenStage: document.querySelector("#screen-stage"),
  screens: Array.from(document.querySelectorAll(".app-screen")),
  heroStats: document.querySelector("#hero-stats"),
  heroFavorite: document.querySelector("#hero-favorite"),
  recentsRail: document.querySelector("#recents-rail"),
  summaryStrips: Array.from(document.querySelectorAll(".js-summary-strip")),
  wardrobeForm: document.querySelector("#wardrobe-form"),
  openAddItem: document.querySelector("#open-add-item"),
  addItemModal: document.querySelector("#add-item-modal"),
  openOutfitBuilder: document.querySelector("#open-outfit-builder"),
  outfitModal: document.querySelector("#outfit-modal"),
  outfitForm: document.querySelector("#outfit-form"),
  outfitSearch: document.querySelector("#outfit-search"),
  outfitPickerGrid: document.querySelector("#outfit-picker-grid"),
  closetControls: document.querySelector("#closet-controls"),
  wardrobeGrid: document.querySelector("#wardrobe-grid"),
  insightList: document.querySelector("#insight-list"),
  suggestionPanel: document.querySelector("#suggestion-panel"),
  combinationList: document.querySelector("#combination-list"),
  generateOutfit: document.querySelector("#generate-outfit"),
  generateWildcard: document.querySelector("#generate-wildcard"),
  heroGenerate: document.querySelector("#hero-generate"),
  inspoForm: document.querySelector("#inspo-form"),
  inspoPanel: document.querySelector("#inspo-panel"),
  promptPanel: document.querySelector("#prompt-panel"),
  exploreSearch: document.querySelector("#explore-search"),
  enableNotifications: document.querySelector("#enable-notifications"),
  openPostComposer: document.querySelector("#open-post-composer"),
  composerModal: document.querySelector("#composer-modal"),
  fitcheckModal: document.querySelector("#fitcheck-modal"),
  fitcheckMessage: document.querySelector("#fitcheck-message"),
  fitcheckPost: document.querySelector("#fitcheck-post"),
  detailModal: document.querySelector("#detail-modal"),
  detailCard: document.querySelector("#detail-card"),
  postForm: document.querySelector("#post-form"),
  exploreFeed: document.querySelector("#explore-feed"),
  profileAvatar: document.querySelector("#profile-avatar"),
  changeAvatar: document.querySelector("#change-avatar"),
  profileAvatarInput: document.querySelector("#profile-avatar-input"),
  profileName: document.querySelector("#profile-name"),
  profileHandle: document.querySelector("#profile-handle"),
  profileStats: document.querySelector("#profile-stats"),
  profileSwitcher: document.querySelector("#profile-switcher"),
  profileGridTitle: document.querySelector("#profile-grid-title"),
  profilePosts: document.querySelector("#profile-posts"),
  statusMessage: document.querySelector("#status-message")
};

let state = loadState();
let toastTimer = null;
let screenTransitionTimer = null;
let outfitGeneratedThisSession = false;
let activeDetailPostId = null;

init();

function init() {
  state = normalizeState(state);
  bindEvents();
  maybeTriggerPrompt();

  if (!state.inspo) {
    state.inspo = buildInspoResult({
      style: "gorpcore",
      energy: "effortless",
      note: "Cold weather, color pop, and technical outerwear."
    });
  }

  render();
  showScreen(state.ui.activeScreen, { animate: false });
  startSplashSequence();
  saveState();
  window.setInterval(tickPromptClock, 30000);
}

function bindEvents() {
  app.authForm.addEventListener("submit", handleAuthSubmit);
  app.nav.addEventListener("click", handleNavClick);
  app.appShell.addEventListener("click", handleScreenLinkClick);
  app.appShell.addEventListener("click", handleHomeActionClick);
  app.openAddItem.addEventListener("click", openAddItemModal);
  app.wardrobeForm.addEventListener("submit", handleWardrobeSubmit);
  app.addItemModal.addEventListener("click", handleAddItemModalClick);
  app.openOutfitBuilder.addEventListener("click", openOutfitModal);
  app.outfitForm.addEventListener("submit", handleOutfitSubmit);
  app.outfitModal.addEventListener("click", handleOutfitModalClick);
  app.outfitModal.addEventListener("change", handleOutfitPickerChange);
  app.outfitSearch.addEventListener("input", handleOutfitSearchInput);
  app.closetControls.addEventListener("click", handleClosetControlsClick);
  app.wardrobeGrid.addEventListener("click", handleWardrobeGridClick);

  app.generateOutfit.addEventListener("click", () => {
    state.suggestion = composeSuggestion({ wildcard: false });
    outfitGeneratedThisSession = true;
    saveState();
    renderSuggestion();
    renderHomeRails();
    flashMessage("Signature fit queued from your favorite combinations.");
  });

  app.generateWildcard.addEventListener("click", () => {
    state.suggestion = composeSuggestion({ wildcard: true });
    outfitGeneratedThisSession = true;
    saveState();
    renderSuggestion();
    renderHomeRails();
    flashMessage("Fresh fit queued.");
  });

  app.heroGenerate.addEventListener("click", () => {
    state.suggestion = composeSuggestion({ wildcard: false });
    outfitGeneratedThisSession = true;
    saveState();
    renderSuggestion();
    renderHomeRails();
    flashMessage("Today's fit is ready.");
  });

  app.suggestionPanel.addEventListener("click", handleSuggestionClick);
  app.inspoForm.addEventListener("submit", handleInspoSubmit);
  app.exploreSearch.addEventListener("input", handleExploreSearchInput);
  app.enableNotifications.addEventListener("click", enableNotifications);
  app.openPostComposer.addEventListener("click", openComposer);
  app.composerModal.addEventListener("click", handleComposerModalClick);
  app.fitcheckModal.addEventListener("click", handleFitcheckModalClick);
  app.fitcheckPost.addEventListener("click", () => {
    closeFitcheckModal();
    openComposer();
  });
  app.detailModal.addEventListener("click", handleDetailModalClick);
  app.detailModal.addEventListener("submit", handleDetailCommentSubmit);
  app.postForm.addEventListener("submit", handlePostSubmit);
  app.promptPanel.addEventListener("click", handlePromptPanelClick);
  app.exploreFeed.addEventListener("click", handleExploreFeedClick);
  app.changeAvatar.addEventListener("click", () => app.profileAvatarInput.click());
  app.profileAvatarInput.addEventListener("change", handleAvatarUpload);
  app.profileSwitcher.addEventListener("click", handleProfileSwitcherClick);
  app.profilePosts.addEventListener("click", handleProfileGridClick);
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw) {
    try {
      return normalizeState(JSON.parse(raw));
    } catch (error) {
      console.warn("Could not parse saved tela state.", error);
    }
  }

  return normalizeState(createInitialState());
}

function createInitialState() {
  const wardrobe = [
    createSeedItem("summit-puffer", "Summit puffer", "Mandarin orange", "Outerwear", "Arc'teryx", 12),
    createSeedItem("storm-beanie", "Storm beanie", "Navy", "Accessory", "Arc'teryx", 7),
    createSeedItem("charcoal-cargos", "Charcoal cargos", "Charcoal", "Bottom", "Nike ACG", 14),
    createSeedItem("ecru-tee", "Ecru tee", "Ecru", "Top", "Uniqlo", 9),
    createSeedItem("trail-runners", "Trail runners", "Sand", "Shoes", "Salomon", 10),
    createSeedItem("forest-fleece", "Forest fleece", "Pine", "Outerwear", "Patagonia", 8),
    createSeedItem("stonewash-denim", "Stonewash denim", "Stonewash", "Bottom", "Levi's", 6),
    createSeedItem("moss-thermal", "Moss thermal", "Moss", "Top", "Our Legacy", 11),
    createSeedItem("city-loafers", "City loafers", "Black", "Shoes", "G.H. Bass", 4),
    createSeedItem("crossbody-sling", "Crossbody sling", "Olive", "Accessory", "Porter", 5)
  ];

  const posts = [
    createSeedPost({
      seedKey: "fit-1",
      user: "Kofi",
      handle: "@stairarchive",
      caption: "Soft stairwell fit. Faded knit, washed denim, loafers.",
      pieces: ["Charcoal argyle knit", "Stone jeans", "Brown loafers"],
      brands: ["Vintage", "Bass"],
      palette: ["#6d6a60", "#a59682", "#e3d8c9"],
      dominantColors: ["charcoal", "taupe", "brown"],
      clothingTypes: ["Top", "Bottom", "Shoes"],
      styleTags: ["soft-tailoring", "minimal-street"],
      location: "Seattle",
      image: "assets/img1.jpg",
      likeCount: 214,
      aspectRatio: "3 / 4"
    }),
    createSeedPost({
      seedKey: "fit-2",
      user: "Ayo",
      handle: "@latefitcheck",
      caption: "Plaid shirt, black puddled trousers, night coffee stop.",
      pieces: ["Plaid button-up", "Wide trousers", "Dark loafers"],
      brands: ["Vintage", "Dr. Martens"],
      palette: ["#6f5a3f", "#222326", "#d7ccb8"],
      dominantColors: ["brown", "black", "olive"],
      clothingTypes: ["Top", "Bottom", "Shoes"],
      styleTags: ["art-school", "minimal-street"],
      location: "Atlanta",
      image: "assets/img2.jpg",
      likeCount: 173,
      aspectRatio: "4 / 5"
    }),
    createSeedPost({
      seedKey: "fit-3",
      user: "Luca",
      handle: "@utilitypoem",
      caption: "Patterned sweater and messenger bag. Quiet but still detailed.",
      pieces: ["Pattern knit", "Dark denim", "Messenger bag", "Brown shoes"],
      brands: ["Our Legacy", "Porter"],
      palette: ["#6f675d", "#4a4642", "#c2ae93"],
      dominantColors: ["charcoal", "brown", "gray"],
      clothingTypes: ["Top", "Bottom", "Accessory", "Shoes"],
      styleTags: ["art-school", "soft-tailoring"],
      location: "Portland",
      image: "assets/img3.jpg",
      likeCount: 289,
      aspectRatio: "3 / 4"
    }),
    createSeedPost({
      seedKey: "fit-4",
      user: "Eli",
      handle: "@olivehours",
      caption: "Olive knit, black trousers, clean proportions.",
      pieces: ["Olive sweater", "Black jeans", "Black loafers"],
      brands: ["COS", "Bass"],
      palette: ["#7a7d49", "#232426", "#d9d2c1"],
      dominantColors: ["olive", "black", "cream"],
      clothingTypes: ["Top", "Bottom", "Shoes"],
      styleTags: ["minimal-street", "soft-tailoring"],
      location: "London",
      image: "assets/img4.jpg",
      likeCount: 251,
      aspectRatio: "4 / 5"
    }),
    createSeedPost({
      seedKey: "fit-5",
      user: "Milan",
      handle: "@washedgray",
      caption: "Washed gray on gray with black shoes. Easy uniform.",
      pieces: ["Gray sweater", "Washed denim", "Black shoes"],
      brands: ["Uniqlo", "Levi's"],
      palette: ["#c7c8c4", "#9ca0a3", "#2b2b2c"],
      dominantColors: ["gray", "silver", "black"],
      clothingTypes: ["Top", "Bottom", "Shoes"],
      styleTags: ["minimal-street"],
      location: "Copenhagen",
      image: "assets/img5.jpg",
      likeCount: 332,
      aspectRatio: "4 / 5"
    }),
    createSeedPost({
      seedKey: "fit-6",
      user: "Soren",
      handle: "@offdutyline",
      caption: "Black crewneck, wide charcoal trousers, strong line from top to shoe.",
      pieces: ["Black knit", "Charcoal trousers", "Brown shoes"],
      brands: ["COS", "Our Legacy"],
      palette: ["#222327", "#57585c", "#d5d0c7"],
      dominantColors: ["black", "charcoal", "white"],
      clothingTypes: ["Top", "Bottom", "Shoes"],
      styleTags: ["minimal-street", "after-dark"],
      location: "Paris",
      image: "assets/img6.jpg",
      likeCount: 306,
      aspectRatio: "3 / 4"
    }),
    createSeedPost({
      seedKey: "fit-7",
      user: "Jules",
      handle: "@platformfit",
      caption: "White tee, sand trousers, brown belt line. Simple and strong.",
      pieces: ["White long sleeve", "Sand trousers", "Brown shoes"],
      brands: ["Vintage", "Paraboot"],
      palette: ["#ece8de", "#cdb793", "#4c392d"],
      dominantColors: ["white", "tan", "brown"],
      clothingTypes: ["Top", "Bottom", "Shoes"],
      styleTags: ["minimal-street", "soft-tailoring"],
      location: "Los Angeles",
      image: "assets/img7.jpg",
      likeCount: 164,
      aspectRatio: "3 / 4"
    }),
    createSeedPost({
      seedKey: "fit-8",
      user: "Kei",
      handle: "@sunpause",
      caption: "Faded red tee, black denim, cap and brown shoes in hard sun.",
      pieces: ["Graphic tee", "Black denim", "Cap", "Brown shoes"],
      brands: ["Stussy", "Vintage"],
      palette: ["#9a4d44", "#2d2d31", "#d5c9b5"],
      dominantColors: ["red", "black", "brown"],
      clothingTypes: ["Top", "Bottom", "Accessory", "Shoes"],
      styleTags: ["art-school", "minimal-street"],
      location: "Tokyo",
      image: "assets/img8.jpg",
      likeCount: 141,
      aspectRatio: "4 / 5"
    }),
    createSeedPost({
      seedKey: "fit-9",
      user: "Min",
      handle: "@bluecheckline",
      caption: "Loose blue plaid and dark trousers. Easy proportions at home.",
      pieces: ["Blue plaid shirt", "Wide trousers"],
      brands: ["Uniqlo", "Vintage"],
      palette: ["#45556a", "#2f3137", "#d8d0c2"],
      dominantColors: ["blue", "navy", "charcoal"],
      clothingTypes: ["Top", "Bottom"],
      styleTags: ["minimal-street", "soft-tailoring"],
      location: "Seoul",
      image: "assets/img9.jpg",
      likeCount: 188,
      aspectRatio: "3 / 4"
    }),
    createSeedPost({
      seedKey: "fit-10",
      user: "Nico",
      handle: "@mirrorquiet",
      caption: "Layered long sleeve under black tee with wide dark trousers.",
      pieces: ["Layered tee", "Wide trousers", "Black flats"],
      brands: ["COS", "Our Legacy"],
      palette: ["#2c2f34", "#6b6d73", "#e8e1d7"],
      dominantColors: ["black", "gray", "white"],
      clothingTypes: ["Top", "Bottom", "Shoes"],
      styleTags: ["minimal-street", "after-dark"],
      location: "Melbourne",
      image: "assets/img10.jpg",
      likeCount: 207,
      aspectRatio: "3 / 4"
    })
  ];

  return {
    wardrobe,
    combinations: [
      {
        id: uid("combo"),
        itemIds: ["summit-puffer", "storm-beanie", "charcoal-cargos", "ecru-tee", "trail-runners"],
        wearCount: 9,
        label: "Weekend market gorp",
        lastWorn: "2026-04-06"
      },
      {
        id: uid("combo"),
        itemIds: ["forest-fleece", "stonewash-denim", "moss-thermal", "trail-runners", "crossbody-sling"],
        wearCount: 5,
        label: "Gallery walk layers",
        lastWorn: "2026-04-03"
      },
      {
        id: uid("combo"),
        itemIds: ["ecru-tee", "stonewash-denim", "city-loafers", "crossbody-sling"],
        wearCount: 4,
        label: "Quiet coffee run",
        lastWorn: "2026-03-29"
      }
    ],
    suggestion: null,
    inspo: null,
    explore: {
      nextPromptAt: nextPromptTime(),
      activePrompt: null,
      notifications: false
    },
    ui: {
      activeScreen: "home",
      signedIn: false,
      user: null,
      closetTypeFilter: "All",
      closetColorFilters: [],
      closetColorMenuOpen: false,
      exploreSearch: "",
      outfitSearch: "",
      outfitBuilderSelectedIds: [],
      profileView: "posts"
    },
    profile: {
      avatar: ""
    },
    savedPostIds: [posts[0].id],
    likedPostIds: [],
    posts
  };
}

function createSeedItem(id, name, color, type, brand, wearCount) {
  return {
    id,
    name,
    color,
    type,
    brand,
    image: "",
    wearCount,
    recentlyWorn: false,
    dirty: false,
    lastWorn: wearCount > 8 ? "2026-04-07" : "2026-04-02"
  };
}

function createSeedPost({
  seedKey,
  user,
  handle,
  caption,
  pieces,
  brands,
  palette,
  dominantColors = [],
  clothingTypes = [],
  styleTags = [],
  location,
  image = "",
  likeCount = 0,
  aspectRatio
}) {
  return {
    id: seedKey ? `seed-${seedKey}` : uid("post"),
    seedKey: seedKey || "",
    user,
    handle,
    caption,
    pieces,
    brands,
    palette,
    dominantColors,
    clothingTypes,
    styleTags,
    location,
    image,
    likeCount,
    comments: [],
    postedAt: "Just now",
    aspectRatio: aspectRatio || randomFrom(["3 / 4", "4 / 5", "1 / 1", "5 / 6"])
  };
}

function normalizeState(candidate) {
  const base = createInitialState();
  const next = candidate || {};
  const wardrobe = Array.isArray(next.wardrobe) ? next.wardrobe : base.wardrobe;
  const currentHandle = next.ui?.user?.name ? `@${slugifyHandle(next.ui.user.name)}` : "@you";
  const posts = normalizePosts(Array.isArray(next.posts) ? next.posts : base.posts, base.posts, currentHandle);

  return {
    wardrobe,
    combinations: Array.isArray(next.combinations) ? next.combinations : base.combinations,
    suggestion: next.suggestion || null,
    inspo: next.inspo || null,
    explore: {
      ...base.explore,
      ...(next.explore || {})
    },
    ui: {
      activeScreen: isValidScreen(next.ui?.activeScreen) ? next.ui.activeScreen : "home",
      signedIn: Boolean(next.ui?.signedIn),
      user: next.ui?.user || null,
      closetTypeFilter: getValidClosetTypeForWardrobe(next.ui?.closetTypeFilter, wardrobe),
      closetColorFilters: Array.isArray(next.ui?.closetColorFilters) ? next.ui.closetColorFilters : [],
      closetColorMenuOpen: Boolean(next.ui?.closetColorMenuOpen),
      exploreSearch: String(next.ui?.exploreSearch || ""),
      outfitSearch: String(next.ui?.outfitSearch || ""),
      outfitBuilderSelectedIds: Array.isArray(next.ui?.outfitBuilderSelectedIds) ? next.ui.outfitBuilderSelectedIds : [],
      profileView: next.ui?.profileView === "saved" ? "saved" : "posts"
    },
    profile: {
      avatar: String(next.profile?.avatar || "")
    },
    savedPostIds: Array.isArray(next.savedPostIds) ? next.savedPostIds : base.savedPostIds,
    likedPostIds: Array.isArray(next.likedPostIds) ? next.likedPostIds : base.likedPostIds,
    posts
  };
}

function normalizePosts(posts, basePosts, currentHandle) {
  const seedMap = new Map(basePosts.filter((post) => post.seedKey).map((post) => [post.seedKey, post]));
  const normalized = posts.map((post) => {
    const fallback = post.seedKey ? seedMap.get(post.seedKey) : null;
    return {
      ...fallback,
      ...post,
      dominantColors: Array.isArray(post.dominantColors) ? post.dominantColors : fallback?.dominantColors || [],
      clothingTypes: Array.isArray(post.clothingTypes) ? post.clothingTypes : fallback?.clothingTypes || [],
      styleTags: Array.isArray(post.styleTags) ? post.styleTags : fallback?.styleTags || [],
      image: String(post.image || fallback?.image || ""),
      likeCount: Number.isFinite(post.likeCount) ? post.likeCount : fallback?.likeCount || 0,
      comments: Array.isArray(post.comments) ? post.comments : fallback?.comments || [],
      aspectRatio: String(post.aspectRatio || fallback?.aspectRatio || "4 / 5")
    };
  });

  const filtered = normalized.filter((post) => post.seedKey || post.image || post.handle === currentHandle);
  const seenSeeds = new Set(filtered.map((post) => post.seedKey).filter(Boolean));
  const missingSeeds = basePosts.filter((post) => post.seedKey && !seenSeeds.has(post.seedKey));
  return [...filtered, ...missingSeeds];
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function startSplashSequence() {
  window.setTimeout(() => {
    app.splashScreen.classList.add("is-hidden");

    if (state.ui.signedIn) {
      showAppShell();
      return;
    }

    showAuthScreen();
  }, 2000);

  window.setTimeout(() => {
    app.splashScreen.hidden = true;
  }, 2650);
}

function showAppShell() {
  app.authScreen.hidden = true;
  app.appShell.classList.add("is-ready");
  document.body.classList.add("is-app-ready");
}

function showAuthScreen() {
  app.authScreen.hidden = false;
  document.body.classList.add("is-app-ready", "is-authing");
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const intent = event.submitter?.value === "signin" ? "signed in" : "created";

  if (!name || !email) {
    flashMessage("Add a name and email.");
    return;
  }

  state.ui.signedIn = true;
  state.ui.user = { name, email };
  saveState();
  document.body.classList.remove("is-authing");
  showAppShell();
  flashMessage(`Account ${intent}. Welcome, ${name}.`);
}

function handleNavClick(event) {
  const button = event.target.closest("[data-screen]");
  if (!button) {
    return;
  }

  showScreen(button.dataset.screen, { animate: true });
}

function handleScreenLinkClick(event) {
  const button = event.target.closest("[data-screen-target]");
  if (!button) {
    return;
  }

  showScreen(button.dataset.screenTarget, { animate: true });
}

function handleHomeActionClick(event) {
  const button = event.target.closest("[data-home-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.homeAction;

  if (action === "signature") {
    state.suggestion = composeSuggestion({ wildcard: false });
    outfitGeneratedThisSession = true;
    flashMessage("Signature fit queued.");
  }

  if (action === "wildcard") {
    state.suggestion = composeSuggestion({ wildcard: true });
    outfitGeneratedThisSession = true;
    flashMessage("Fresh fit queued.");
  }

  saveState();
  renderSuggestion();
  renderHomeRails();
}

function showScreen(screenId, { animate }) {
  if (!isValidScreen(screenId)) {
    return;
  }

  const current = app.screens.find((screen) => screen.classList.contains("is-active")) || null;
  const next = app.screens.find((screen) => screen.dataset.screen === screenId);

  if (!next) {
    return;
  }

  state.ui.activeScreen = screenId;
  updateNav();

  if (!current || current === next) {
    app.screens.forEach((screen) => {
      const active = screen === next;
      screen.hidden = !active;
      screen.classList.toggle("is-active", active);
    });
    saveState();
    return;
  }

  window.clearTimeout(screenTransitionTimer);

  if (!animate || !current.animate || !next.animate) {
    current.hidden = true;
    current.classList.remove("is-active");
    next.hidden = false;
    next.classList.add("is-active");
    saveState();
    return;
  }

  const currentHeight = current.offsetHeight;
  if (currentHeight) {
    app.screenStage.style.minHeight = `${currentHeight}px`;
  }

  const currentAnimation = current.animate(
    [
      { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
      { opacity: 0, transform: "translateY(-16px) scale(0.992)", filter: "blur(8px)" }
    ],
    {
      duration: 180,
      easing: "cubic-bezier(0.4, 0, 1, 1)",
      fill: "forwards"
    }
  );
  currentAnimation.onfinish = () => currentAnimation.cancel();

  screenTransitionTimer = window.setTimeout(() => {
    current.hidden = true;
    current.classList.remove("is-active");

    next.hidden = false;
    next.classList.add("is-active");
    const nextAnimation = next.animate(
      [
        { opacity: 0, transform: "translateY(20px) scale(0.985)", filter: "blur(12px)" },
        { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" }
      ],
      {
        duration: 360,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both"
      }
    );
    nextAnimation.onfinish = () => nextAnimation.cancel();

    requestAnimationFrame(() => {
      app.screenStage.style.minHeight = `${next.offsetHeight}px`;
      window.setTimeout(() => {
        app.screenStage.style.minHeight = "";
      }, 360);
    });
  }, 120);

  saveState();
}

function updateNav() {
  const activeScreen = state.ui.activeScreen;
  app.nav.querySelectorAll("[data-screen]").forEach((button) => {
    const active = button.dataset.screen === activeScreen;
    button.classList.toggle("is-active", active);
    if (active) {
      button.setAttribute("aria-current", "page");
      return;
    }

    button.removeAttribute("aria-current");
  });

  document.querySelectorAll("[data-screen-target]").forEach((button) => {
    const active = button.dataset.screenTarget === activeScreen;
    button.classList.toggle("is-active", active);

    if (active) {
      button.setAttribute("aria-current", "page");
      return;
    }

    button.removeAttribute("aria-current");
  });
}

function isValidScreen(value) {
  return SCREENS.includes(value);
}

function render() {
  renderHero();
  renderSummary();
  renderHomeRails();
  renderInsights();
  renderClosetControls();
  renderWardrobe();
  renderOutfitPicker();
  renderSuggestion();
  renderCombinations();
  renderInspo();
  renderPrompt();
  renderFeed();
  renderProfile();
  app.exploreSearch.value = state.ui.exploreSearch;
  if (app.outfitSearch) {
    app.outfitSearch.value = state.ui.outfitSearch;
  }
}

function renderHero() {
  const cleanItems = getCleanItems();
  const favoriteCombo = getFavoriteCombo();
  const topRepeat = favoriteCombo ? comboPiecesLabel(favoriteCombo.itemIds).join(" / ") : "No outfit history yet";

  app.heroStats.innerHTML = `
    <div class="stat-card stat-card-wardrobe">
      <span class="stat-kicker">Closet</span>
      <div class="stat-main">
        <strong>${state.wardrobe.length}</strong>
      </div>
    </div>
    <div class="stat-card stat-card-ready">
      <span class="stat-kicker">Ready</span>
      <div class="stat-main">
        <strong>${cleanItems.length}</strong>
      </div>
    </div>
    <div class="stat-card stat-card-combos">
      <span class="stat-kicker">Rotation</span>
      <div class="stat-main">
        <strong>${state.combinations.length}</strong>
      </div>
    </div>
    <div class="stat-card stat-card-saved">
      <span class="stat-kicker">Saved fits</span>
      <div class="stat-main">
        <strong>${state.savedPostIds.length}</strong>
      </div>
    </div>
  `;

  app.heroFavorite.innerHTML = favoriteCombo
    ? `
      <h3>${escapeHtml(favoriteCombo.label)}</h3>
      <p class="support-copy">${escapeHtml(topRepeat)}</p>
      <p class="support-copy">${favoriteCombo.wearCount} replays</p>
    `
    : `
      <h3>No favorite fit yet</h3>
      <p class="support-copy">Wear a generated outfit to let tela learn your first replayable combination.</p>
    `;
}

function renderSummary() {
  const dirtyCount = state.wardrobe.filter((item) => item.dirty).length;
  const recentCount = state.wardrobe.filter((item) => item.recentlyWorn).length;
  const mostWorn = [...state.wardrobe].sort((a, b) => b.wearCount - a.wearCount)[0];
  const markup = `
    <div class="summary-card">
      <strong>${dirtyCount}</strong>
      <span>dirty pieces</span>
    </div>
    <div class="summary-card">
      <strong>${recentCount}</strong>
      <span>recent tags</span>
    </div>
    <div class="summary-card">
      <strong>${mostWorn ? escapeHtml(mostWorn.name) : "--"}</strong>
      <span>most worn item</span>
    </div>
  `;

  app.summaryStrips.forEach((strip) => {
    strip.innerHTML = markup;
  });
}

function renderHomeRails() {
  renderRecentsRail();
}

function renderRecentsRail() {
  if (!app.recentsRail) {
    return;
  }

  const recentItems = [...state.wardrobe]
    .sort((a, b) => compareDateDesc(a.lastWorn, b.lastWorn) || b.wearCount - a.wearCount)
    .slice(0, 8);

  app.recentsRail.innerHTML = recentItems
    .map((item) =>
      renderHomeShelfCard({
        title: item.name,
        meta: `${item.color} · ${item.wearCount} wears`,
        image: item.image || createGarmentImage(item),
        screen: "closet"
      })
    )
    .join("");
}

function renderHomeShelfCard({ title, meta, image, action, screen }) {
  const actionAttribute = action ? `data-home-action="${escapeHtml(action)}"` : "";
  const screenAttribute = screen ? `data-screen-target="${escapeHtml(screen)}"` : "";

  return `
    <button class="home-shelf-card" ${actionAttribute} ${screenAttribute} type="button">
      <img src="${image}" alt="" />
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(meta)}</span>
    </button>
  `;
}

function renderInsights() {
  const cleanItems = getCleanItems();
  const topOuterwear = [...state.wardrobe]
    .filter((item) => item.type === "Outerwear")
    .sort((a, b) => b.wearCount - a.wearCount)[0];
  const repeatRate = state.combinations.length
    ? Math.round((state.combinations.reduce((total, combo) => total + combo.wearCount, 0) / state.combinations.length) * 10) / 10
    : 0;

  app.insightList.innerHTML = `
    <div class="insight-pill">
      <strong>Ready now</strong>
      <span>${cleanItems.length} clean items</span>
    </div>
    <div class="insight-pill">
      <strong>Hero layer</strong>
      <span>${topOuterwear ? escapeHtml(topOuterwear.name) : "Add outerwear"}</span>
    </div>
    <div class="insight-pill">
      <strong>Replay avg</strong>
      <span>${repeatRate} wears per combo</span>
    </div>
  `;
}

function renderClosetControls() {
  const types = getClosetTypes();
  const colors = getClosetColors();
  const activeType = state.ui.closetTypeFilter;
  const activeColors = state.ui.closetColorFilters;
  const colorButtonLabel = activeColors.length ? `Color (${activeColors.length})` : "Color";

  app.closetControls.innerHTML = `
    <div class="closet-filter-bar">
      <div class="section-tabs" aria-label="Closet sections">
        ${types
          .map(
            (type) => `
              <button
                class="section-tab ${activeType === type ? "is-active" : ""}"
                data-filter-action="type"
                data-type="${escapeHtml(type)}"
                type="button"
              >
                ${escapeHtml(type)}
              </button>
            `
          )
          .join("")}
      </div>
      <div class="filter-actions">
        <button class="filter-menu-button ${activeColors.length ? "is-active" : ""}" data-filter-action="toggle-color-menu" type="button">
          ${escapeHtml(colorButtonLabel)}
        </button>
        <button class="text-button" data-filter-action="clear" type="button">Clear</button>
      </div>
    </div>
    <div class="color-popover ${state.ui.closetColorMenuOpen ? "is-open" : ""}">
      <div class="color-swatch-row" aria-label="Color filters">
        ${colors
          .map(
            (color) => `
              <button
                class="color-swatch ${activeColors.includes(color) ? "is-active" : ""}"
                data-filter-action="color"
                data-color="${escapeHtml(color)}"
                type="button"
                style="background: ${colorToHex(color)}"
                aria-label="${escapeHtml(color)}"
                title="${escapeHtml(color)}"
              ></button>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderWardrobe() {
  if (!state.wardrobe.length) {
    app.wardrobeGrid.innerHTML = `<div class="empty-state">No items yet. Add your first piece.</div>`;
    return;
  }

  const sortedItems = getFilteredWardrobe().sort((a, b) => b.wearCount - a.wearCount);

  if (!sortedItems.length) {
    app.wardrobeGrid.innerHTML = `<div class="empty-state">No items match those filters.</div>`;
    return;
  }

  app.wardrobeGrid.innerHTML = sortedItems
    .map((item) => {
      const image = item.image || createGarmentImage(item);
      const lastWornLabel = item.lastWorn ? formatDate(item.lastWorn) : "Never logged";

      return `
        <article class="card item-card">
          <div class="item-image">
            <img src="${image}" alt="${escapeHtml(item.name)}" />
          </div>
          <div class="item-body">
            <div class="item-title-row">
              <div>
                <h3>${escapeHtml(item.name)}</h3>
                <p class="meta-row">
                  <span>${escapeHtml(item.brand || "Brand not tagged")}</span>
                </p>
              </div>
              <span class="item-type">${escapeHtml(item.type)}</span>
            </div>
            <div class="tags">
              <span class="tag">${escapeHtml(item.color)}</span>
              <span class="tag">${item.wearCount} wears</span>
            </div>
            <div class="status-row">
              <span class="status-tag ${item.recentlyWorn ? "" : ""}">
                ${item.recentlyWorn ? "Recently worn" : "Ready to repeat"}
              </span>
              <span class="status-tag ${item.dirty ? "is-dirty" : ""}">
                ${item.dirty ? "Dirty" : "Clean"}
              </span>
            </div>
            <p class="meta-row">
              <span>Last worn</span>
              <span>${escapeHtml(lastWornLabel)}</span>
            </p>
            <div class="card-actions">
              <button class="mini-button ${item.recentlyWorn ? "is-active" : ""}" data-action="toggle-recent" data-id="${item.id}" type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8Zm1 4v3.59l2.7 2.7-1.4 1.41L11 12.41V8Z"/></svg>
                <span>Recent</span>
              </button>
              <button class="mini-button ${item.dirty ? "is-dirty" : ""}" data-action="toggle-dirty" data-id="${item.id}" type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12l-1 4H7Zm1.2 6h9.6l1.9 8.5A1.25 1.25 0 0 1 17.48 20H6.52a1.25 1.25 0 0 1-1.22-1.5Z"/></svg>
                <span>${item.dirty ? "Dirty" : "Clean"}</span>
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSuggestion() {
  const suggestion = state.suggestion;

  if (!outfitGeneratedThisSession) {
    app.suggestionPanel.innerHTML = `
      <div class="suggestion-empty">
        Press Signature fit or Surprise me to get one outfit recommendation.
      </div>
    `;
    return;
  }

  if (!suggestion || !suggestion.items.length) {
    app.suggestionPanel.innerHTML = `
      <div class="suggestion-empty">
        Add a top, bottom, and shoes.
      </div>
    `;
    return;
  }

  app.suggestionPanel.innerHTML = `
    <div class="now-playing-card">
      <div class="now-playing-cover">
        <img src="${createMixCover(suggestion)}" alt="" />
      </div>
      <div class="now-playing-body">
        <p class="eyebrow">today's fit</p>
        <div class="suggestion-row">
          <h3 class="suggestion-title">${escapeHtml(suggestion.title)}</h3>
          <span class="combo-tag">${escapeHtml(suggestion.mode)}</span>
        </div>
        <div class="mini-tracklist">
          ${suggestion.items
            .map((item) => `<span>${escapeHtml(item.name)}</span>`)
            .join("")}
        </div>
        <p class="suggestion-copy">${escapeHtml(shortenText(suggestion.reason, 150))}</p>
      </div>
    </div>
    <div class="button-row">
      <button class="button button-primary" data-action="mark-worn" type="button">Wear this outfit</button>
      <button class="button button-secondary" data-action="spin-again" type="button">Spin again</button>
    </div>
  `;
}

function renderCombinations() {
  const topCombos = [...state.combinations].sort((a, b) => b.wearCount - a.wearCount).slice(0, 4);

  if (!topCombos.length) {
    app.combinationList.innerHTML = `<div class="empty-state">No replays yet.</div>`;
    return;
  }

  app.combinationList.innerHTML = `
    <div class="combo-list">
      ${topCombos
        .map((combo) => {
          const labels = comboPiecesLabel(combo.itemIds);
          return `
            <div class="combo-item">
              <strong>${escapeHtml(combo.label)}</strong>
              <div class="post-tags">
                <span class="combo-tag">${combo.wearCount} wears</span>
                <span class="combo-tag">${escapeHtml(formatDate(combo.lastWorn))}</span>
              </div>
              <p class="support-copy">${escapeHtml(shortenText(labels.join(" / "), 80))}</p>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderOutfitPicker() {
  const pickerGrid = app.outfitPickerGrid;
  const selectedIds = new Set(state.ui.outfitBuilderSelectedIds);
  const query = state.ui.outfitSearch.toLowerCase();

  if (!pickerGrid) {
    return;
  }

  const orderedTypes = ["Bottom", "Outerwear", "Shoes", "Top", "Accessory"];
  const items = [...state.wardrobe]
    .filter((item) => {
      if (!query) {
        return true;
      }

      const haystack = [item.name, item.color, item.type, item.brand].join(" ").toLowerCase();
      return haystack.includes(query);
    })
    .sort((left, right) => {
      const leftIndex = orderedTypes.indexOf(left.type);
      const rightIndex = orderedTypes.indexOf(right.type);
      const safeLeft = leftIndex === -1 ? orderedTypes.length : leftIndex;
      const safeRight = rightIndex === -1 ? orderedTypes.length : rightIndex;
      return safeLeft - safeRight || left.name.localeCompare(right.name);
    });

  if (!state.wardrobe.length) {
    pickerGrid.innerHTML = `<div class="empty-state">Add a few items first.</div>`;
    return;
  }

  if (!items.length) {
    pickerGrid.innerHTML = `<div class="empty-state">No closet items match that search.</div>`;
    return;
  }

  let currentType = "";
  pickerGrid.innerHTML = items
    .map((item) => {
      const image = item.image || createGarmentImage(item);
      const heading = item.type !== currentType ? `<div class="outfit-section-heading">${escapeHtml(item.type)}</div>` : "";
      currentType = item.type;
      return `
        ${heading}
        <label class="outfit-picker-item">
          <input name="itemIds" type="checkbox" value="${item.id}" ${selectedIds.has(item.id) ? "checked" : ""} />
          <div class="outfit-picker-thumb">
            <img src="${image}" alt="${escapeHtml(item.name)}" />
          </div>
          <div class="outfit-picker-copy">
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.color)}${item.brand ? ` · ${escapeHtml(item.brand)}` : ""}</span>
          </div>
        </label>
      `;
    })
    .join("");
}

function renderInspo() {
  const inspo = state.inspo;

  if (!inspo) {
    app.inspoPanel.innerHTML = `<div class="empty-state">Pick a mood.</div>`;
    return;
  }

  app.inspoPanel.innerHTML = `
    <div class="inspo-poster">
      <img src="${inspo.image}" alt="${escapeHtml(inspo.title)} mood board" />
    </div>
    <div class="inspo-text">
      <div>
        <p class="eyebrow">${escapeHtml(inspo.styleLabel)} / ${escapeHtml(inspo.energy)}</p>
        <h3 class="inspo-title">${escapeHtml(inspo.title)}</h3>
        <p class="support-copy">${escapeHtml(shortenText(inspo.description, 120))}</p>
      </div>
      <div class="post-tags">
        ${inspo.pieces.map((piece) => `<span class="tag">${escapeHtml(piece)}</span>`).join("")}
      </div>
      <p class="support-copy">Brief: ${escapeHtml(shortenText(inspo.prompt, 120))}</p>
    </div>
  `;
}

function renderPrompt() {
  const activePrompt = state.explore.activePrompt;

  if (activePrompt && new Date(activePrompt.expiresAt).getTime() > Date.now()) {
    app.promptPanel.innerHTML = `
      <button class="prompt-chip pulse" data-action="open-fitcheck" type="button">
        <strong>Fit check live</strong>
        <span>${escapeHtml(activePrompt.message)}</span>
      </button>
    `;
    maybeShowFitcheckModal();
    return;
  }

  app.promptPanel.innerHTML = `
    <div class="prompt-chip prompt-chip-idle">
      <strong>Random daily alert</strong>
      <span>${state.explore.notifications ? "Alerts on" : "Turn alerts on"}</span>
    </div>
  `;
}

function renderFeed() {
  const posts = getFilteredPosts();

  if (!posts.length) {
    app.exploreFeed.innerHTML = `<div class="empty-state">No posts yet.</div>`;
    return;
  }

  app.exploreFeed.innerHTML = posts
    .map((post) => {
      const image = post.image || createPostImage(post);
      const liked = isLikedPost(post.id);
      return `
        <button class="masonry-card" data-post-id="${post.id}" type="button">
          <div class="masonry-image" style="aspect-ratio: ${post.aspectRatio || "4 / 5"}">
            <img src="${image}" alt="${escapeHtml(post.caption || `Outfit by ${post.user}`)}" />
          </div>
          <div class="masonry-meta">
            <span class="masonry-heart ${liked ? "is-liked" : ""}" aria-hidden="true">♥</span>
            <span>${post.likeCount || 0}</span>
          </div>
          <span class="masonry-dots" aria-hidden="true">•••</span>
        </button>
      `;
    })
    .join("");
}

function renderProfile() {
  const user = state.ui.user || { name: "Your profile", email: "" };
  const ownPosts = getOwnPosts();
  const savedPosts = getSavedPosts();
  const avatar = state.profile.avatar || createAvatarImage(user.name);
  const activeView = state.ui.profileView;
  const visiblePosts = activeView === "saved" ? savedPosts : ownPosts;
  const emptyMessage =
    activeView === "saved"
      ? "Save outfits from Explore to keep them here."
      : "Post your first fit to start your archive.";

  app.profileAvatar.innerHTML = `<img src="${avatar}" alt="${escapeHtml(user.name)} profile photo" />`;
  app.profileName.textContent = user.name;
  app.profileHandle.textContent = `@${slugifyHandle(user.name || "tela-user")}`;
  app.profileStats.innerHTML = `
    <div class="summary-card">
      <strong>${ownPosts.length}</strong>
      <span>posts</span>
    </div>
    <div class="summary-card">
      <strong>${savedPosts.length}</strong>
      <span>saved fits</span>
    </div>
    <div class="summary-card">
      <strong>${state.wardrobe.length}</strong>
      <span>closet items</span>
    </div>
  `;
  app.profileGridTitle.textContent = activeView === "saved" ? "Saved fits" : "Past fits";
  app.profilePosts.innerHTML = renderProfileGrid(visiblePosts, emptyMessage);
  app.profileSwitcher.querySelectorAll("[data-profile-view]").forEach((button) => {
    const active = button.dataset.profileView === activeView;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function renderProfileGrid(posts, emptyMessage) {
  if (!posts.length) {
    return `<div class="empty-state">${escapeHtml(emptyMessage)}</div>`;
  }

  return posts
    .map((post) => {
      const image = post.image || createPostImage(post);
      return `
        <button class="profile-post-card" data-post-id="${post.id}" type="button">
          <div class="profile-post-image">
            <img src="${image}" alt="${escapeHtml(post.caption || `Outfit by ${post.user}`)}" />
          </div>
        </button>
      `;
    })
    .join("");
}

function renderPostDetail(post) {
  if (!post) {
    app.detailModal.hidden = true;
    return;
  }

  const image = post.image || createPostImage(post);
  const saved = isSavedPost(post.id);
  const liked = isLikedPost(post.id);
  const ownPost = isOwnPost(post);
  const comments = Array.isArray(post.comments) ? post.comments : [];
  app.detailCard.innerHTML = `
    <div class="detail-layout">
      <div class="detail-image">
        <img src="${image}" alt="${escapeHtml(post.caption || `Outfit by ${post.user}`)}" />
      </div>
      <div class="detail-body">
        <div class="detail-header">
          <div>
            <h3>${escapeHtml(post.user)}</h3>
            <p class="post-meta">${escapeHtml(post.handle)} · ${escapeHtml(post.location)} · ${escapeHtml(post.postedAt)}</p>
          </div>
          <button class="text-button" data-detail-close type="button">Close</button>
        </div>
        <p class="caption">${escapeHtml(post.caption)}</p>
        <div class="post-tags">
          ${post.pieces.map((piece) => `<span class="tag">${escapeHtml(piece)}</span>`).join("")}
        </div>
        ${post.brands.length ? `<p class="support-copy">Brands: ${escapeHtml(post.brands.join(", "))}</p>` : ""}
        <div class="button-row">
          ${
            ownPost
              ? `<span class="status-tag">On your profile</span>`
              : `
                <button class="button button-secondary detail-like-button ${liked ? "is-liked" : ""}" data-action="toggle-like" data-id="${post.id}" type="button"><span class="detail-like-heart" aria-hidden="true">♥</span><span>${post.likeCount || 0}</span></button>
                <button class="button button-secondary" data-action="toggle-save" data-id="${post.id}" type="button">${saved ? "Saved" : "Save outfit"}</button>
              `
          }
        </div>
        <div class="detail-comments">
          <div class="card-heading">
            <h3>Comments</h3>
          </div>
          <div class="comment-list">
            ${
              comments.length
                ? comments
                    .map(
                      (comment) => `
                        <div class="comment-item">
                          <strong>${escapeHtml(comment.user)}</strong>
                          <p>${escapeHtml(comment.text)}</p>
                        </div>
                      `
                    )
                    .join("")
                : `<div class="empty-state">No comments yet.</div>`
            }
          </div>
          <form class="comment-form" data-comment-form data-id="${post.id}">
            <input name="comment" type="text" placeholder="Write a comment..." required />
            <button class="button button-primary" type="submit">Post</button>
          </form>
        </div>
      </div>
    </div>
  `;
  app.detailModal.hidden = false;
  document.body.classList.add("is-modal-open");
}

async function handleWardrobeSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const file = formData.get("image");

  const item = {
    id: uid("item"),
    name: String(formData.get("name") || "").trim(),
    color: String(formData.get("color") || "").trim(),
    type: String(formData.get("type") || "Top"),
    brand: String(formData.get("brand") || "").trim(),
    image: "",
    wearCount: 0,
    recentlyWorn: formData.get("recentlyWorn") === "on",
    dirty: formData.get("dirty") === "on",
    lastWorn: ""
  };

  if (!item.name || !item.color) {
    flashMessage("Add at least a name and color for the item.");
    return;
  }

  if (file instanceof File && file.size > 0) {
    item.image = await readFileAsDataUrl(file);
  }

  state.wardrobe.unshift(item);
  saveState();
  form.reset();
  closeAddItemModal();
  state.suggestion = composeSuggestion({ wildcard: false });
  saveState();
  render();
  flashMessage(`${item.name} added to your closet.`);
}

function handleOutfitSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const itemIds = [...state.ui.outfitBuilderSelectedIds];
  const label = String(formData.get("name") || "").trim();

  if (itemIds.length < 2) {
    flashMessage("Pick at least two items for the outfit.");
    return;
  }

  const title = label || buildOutfitName(itemIds);
  const sortedIds = [...itemIds].sort();
  const existing = state.combinations.find((combo) => sameItems(combo.itemIds, sortedIds));

  if (existing) {
    existing.label = title;
    existing.lastWorn = existing.lastWorn || todayIso();
  } else {
    state.combinations.unshift({
      id: uid("combo"),
      itemIds: sortedIds,
      wearCount: 0,
      label: title,
      lastWorn: ""
    });
  }

  saveState();
  event.currentTarget.reset();
  state.ui.outfitBuilderSelectedIds = [];
  state.ui.outfitSearch = "";
  closeOutfitModal();
  renderCombinations();
  flashMessage("Outfit saved to your rotation.");
}

function handleClosetControlsClick(event) {
  const button = event.target.closest("[data-filter-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.filterAction;

  if (action === "clear") {
    state.ui.closetTypeFilter = "All";
    state.ui.closetColorFilters = [];
    state.ui.closetColorMenuOpen = false;
  }

  if (action === "type") {
    state.ui.closetTypeFilter = getValidClosetType(button.dataset.type);
  }

  if (action === "toggle-color-menu") {
    state.ui.closetColorMenuOpen = !state.ui.closetColorMenuOpen;
  }

  if (action === "color") {
    toggleClosetColorFilter(button.dataset.color);
  }

  saveState();
  renderClosetControls();
  renderWardrobe();
}

function handleWardrobeGridClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const itemId = button.dataset.id;
  const action = button.dataset.action;
  const item = state.wardrobe.find((entry) => entry.id === itemId);

  if (!item) {
    return;
  }

  if (action === "toggle-recent") {
    item.recentlyWorn = !item.recentlyWorn;
    if (item.recentlyWorn && !item.lastWorn) {
      item.lastWorn = todayIso();
    }
  }

  if (action === "toggle-dirty") {
    item.dirty = !item.dirty;
  }

  state.suggestion = composeSuggestion({ wildcard: false });
  saveState();
  render();
}

function handleSuggestionClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.action;

  if (action === "mark-worn") {
    applySuggestionWear();
    flashMessage("Outfit logged. Tela learned another favorite.");
  }

  if (action === "spin-again") {
    state.suggestion = composeSuggestion({ wildcard: true });
    outfitGeneratedThisSession = true;
    saveState();
    renderSuggestion();
    renderHomeRails();
  }
}

function handleInspoSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  state.inspo = buildInspoResult({
    style: String(formData.get("style") || "gorpcore"),
    energy: String(formData.get("energy") || "effortless"),
    note: String(formData.get("note") || "").trim()
  });
  saveState();
  renderInspo();
  renderHomeRails();
  flashMessage("Fresh inspo board rendered.");
}

function handleExploreSearchInput(event) {
  state.ui.exploreSearch = event.currentTarget.value.trim();
  saveState();
  renderFeed();
}

function openAddItemModal() {
  app.addItemModal.hidden = false;
  document.body.classList.add("is-modal-open");
}

function closeAddItemModal() {
  app.addItemModal.hidden = true;
  if (app.outfitModal.hidden && app.composerModal.hidden && app.detailModal.hidden && app.fitcheckModal.hidden) {
    document.body.classList.remove("is-modal-open");
  }
}

function handleAddItemModalClick(event) {
  if (!event.target.closest("[data-add-item-close]")) {
    return;
  }

  closeAddItemModal();
}

function openOutfitModal() {
  state.ui.outfitSearch = "";
  state.ui.outfitBuilderSelectedIds = [];
  app.outfitForm.reset();
  renderOutfitPicker();
  app.outfitSearch.value = "";
  app.outfitModal.hidden = false;
  document.body.classList.add("is-modal-open");
}

function closeOutfitModal() {
  app.outfitModal.hidden = true;
  if (app.addItemModal.hidden && app.composerModal.hidden && app.detailModal.hidden && app.fitcheckModal.hidden) {
    document.body.classList.remove("is-modal-open");
  }
}

function handleOutfitModalClick(event) {
  if (!event.target.closest("[data-outfit-close]")) {
    return;
  }

  closeOutfitModal();
}

function handleOutfitSearchInput(event) {
  state.ui.outfitSearch = event.currentTarget.value.trim();
  renderOutfitPicker();
}

function handleOutfitPickerChange(event) {
  const input = event.target.closest("input[name='itemIds']");

  if (!input) {
    return;
  }

  const selected = new Set(state.ui.outfitBuilderSelectedIds);

  if (input.checked) {
    selected.add(input.value);
  } else {
    selected.delete(input.value);
  }

  state.ui.outfitBuilderSelectedIds = [...selected];
}

function openComposer() {
  app.composerModal.hidden = false;
  document.body.classList.add("is-modal-open");
  const fileInput = app.postForm.elements.image;

  if (fileInput) {
    fileInput.click();
  }
}

function closeComposer() {
  app.composerModal.hidden = true;
  if (app.addItemModal.hidden && app.outfitModal.hidden && app.detailModal.hidden && app.fitcheckModal.hidden) {
    document.body.classList.remove("is-modal-open");
  }
}

function handleComposerModalClick(event) {
  if (!event.target.closest("[data-modal-close]")) {
    return;
  }

  closeComposer();
}

function maybeShowFitcheckModal() {
  const activePrompt = state.explore.activePrompt;

  if (!activePrompt || activePrompt.presentedAt) {
    return;
  }

  activePrompt.presentedAt = new Date().toISOString();
  saveState();
  app.fitcheckMessage.textContent = activePrompt.message;
  app.fitcheckModal.hidden = false;
  document.body.classList.add("is-modal-open");
}

function closeFitcheckModal() {
  app.fitcheckModal.hidden = true;
  if (app.addItemModal.hidden && app.outfitModal.hidden && app.composerModal.hidden && app.detailModal.hidden) {
    document.body.classList.remove("is-modal-open");
  }
}

function handleFitcheckModalClick(event) {
  if (!event.target.closest("[data-fitcheck-close]")) {
    return;
  }

  closeFitcheckModal();
}

function handleExploreFeedClick(event) {
  const card = event.target.closest("[data-post-id]");
  if (!card) {
    return;
  }

  activeDetailPostId = card.dataset.postId;
  const post = state.posts.find((entry) => entry.id === activeDetailPostId);
  renderPostDetail(post || null);
}

function handleDetailModalClick(event) {
  const likeButton = event.target.closest("[data-action='toggle-like']");

  if (likeButton) {
    toggleLikedPost(likeButton.dataset.id);
    const post = state.posts.find((entry) => entry.id === activeDetailPostId);
    renderPostDetail(post || null);
    renderFeed();
    return;
  }

  const saveButton = event.target.closest("[data-action='toggle-save']");

  if (saveButton) {
    toggleSavedPost(saveButton.dataset.id);
    const post = state.posts.find((entry) => entry.id === activeDetailPostId);
    renderPostDetail(post || null);
    renderFeed();
    renderProfile();
    return;
  }

  if (!event.target.closest("[data-detail-close]")) {
    return;
  }

  activeDetailPostId = null;
  app.detailModal.hidden = true;
  if (app.addItemModal.hidden && app.outfitModal.hidden && app.composerModal.hidden && app.fitcheckModal.hidden) {
    document.body.classList.remove("is-modal-open");
  }
}

function handleDetailCommentSubmit(event) {
  const form = event.target.closest("[data-comment-form]");

  if (!form) {
    return;
  }

  event.preventDefault();
  const formData = new FormData(form);
  const text = String(formData.get("comment") || "").trim();

  if (!text) {
    return;
  }

  const post = state.posts.find((entry) => entry.id === form.dataset.id);

  if (!post) {
    return;
  }

  post.comments = [
    ...(post.comments || []),
    {
      id: uid("comment"),
      user: state.ui.user?.name || "You",
      text
    }
  ];
  saveState();
  renderPostDetail(post);
  renderProfile();
  flashMessage("Comment posted.");
}

async function handlePostSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const file = formData.get("image");

  const post = {
    id: uid("post"),
    user: state.ui.user?.name || "You",
    handle: state.ui.user?.name ? `@${slugifyHandle(state.ui.user.name)}` : "@you",
    location: "Your city",
    caption: String(formData.get("caption") || "").trim(),
    pieces: splitList(String(formData.get("pieces") || "")),
    brands: splitList(String(formData.get("brands") || "")),
    palette: ["#f68a1f", "#283245", "#efe3cf"],
    dominantColors: inferPostColorsFromCloset(),
    clothingTypes: inferPostTypesFromPieces(splitList(String(formData.get("pieces") || ""))),
    styleTags: inferStyleTagsForPost(),
    image: "",
    postedAt: "Just now",
    aspectRatio: "3 / 4",
    likeCount: 0
  };

  if (!post.caption || !post.pieces.length) {
    flashMessage("Add a caption and at least one tagged piece.");
    return;
  }

  if (file instanceof File && file.size > 0) {
    post.image = await readFileAsDataUrl(file);
  }

  state.posts.unshift(post);
  if (state.explore.activePrompt) {
    state.explore.activePrompt = null;
    state.explore.nextPromptAt = nextPromptTime();
  }
  saveState();
  form.reset();
  closeComposer();
  closeFitcheckModal();
  renderPrompt();
  renderFeed();
  renderHomeRails();
  renderProfile();
  flashMessage("Your outfit hit the explore feed.");
}

async function handleAvatarUpload(event) {
  const file = event.currentTarget.files?.[0];

  if (!file) {
    return;
  }

  state.profile.avatar = await readFileAsDataUrl(file);
  saveState();
  renderProfile();
  event.currentTarget.value = "";
  flashMessage("Profile photo updated.");
}

function handleProfileGridClick(event) {
  const card = event.target.closest("[data-post-id]");

  if (!card) {
    return;
  }

  activeDetailPostId = card.dataset.postId;
  const post = state.posts.find((entry) => entry.id === activeDetailPostId);
  renderPostDetail(post || null);
}

function handleProfileSwitcherClick(event) {
  const button = event.target.closest("[data-profile-view]");

  if (!button) {
    return;
  }

  state.ui.profileView = button.dataset.profileView === "saved" ? "saved" : "posts";
  saveState();
  renderProfile();
}

function handlePromptPanelClick(event) {
  const openButton = event.target.closest("[data-action='open-fitcheck']");

  if (openButton) {
    app.fitcheckMessage.textContent = state.explore.activePrompt?.message || "It's time for your fit check.";
    app.fitcheckModal.hidden = false;
    document.body.classList.add("is-modal-open");
    return;
  }
}

function composeSuggestion({ wildcard }) {
  const cleanItems = getCleanItems();
  const combos = scoreCombinations(cleanItems);

  if (combos.length) {
    const bestCombo = wildcard ? withWildcard(combos[0], cleanItems) : combos[0];
    const comboItems = bestCombo.itemIds
      .map((id) => state.wardrobe.find((item) => item.id === id))
      .filter(Boolean);

    if (comboItems.length) {
      return {
        title: bestCombo.label || (wildcard ? "Fresh favorite fit" : "Most replayed outfit"),
        summary: wildcard
          ? "Built from a proven combination, then nudged with a fresher piece so the outfit still feels like you."
          : "This outfit comes straight from the combinations you return to most often.",
        reason: describeSuggestion(comboItems, { wildcard, fromHistory: true, tasteLed: getTasteScoreForItems(comboItems) > 0 }),
        items: comboItems,
        comboId: bestCombo.id,
        mode: wildcard ? "fresh pull" : "favorite fit"
      };
    }
  }

  const assembledItems = assembleFromPieces(cleanItems, wildcard);
  return {
    title: wildcard ? "Fresh pull from your closet" : "New outfit from your strongest pieces",
    summary: "Tela pulled clean pieces from your closet.",
    reason: describeSuggestion(assembledItems, { wildcard, fromHistory: false, tasteLed: getTasteScoreForItems(assembledItems) > 0 }),
    items: assembledItems,
    comboId: null,
    mode: wildcard ? "fresh pull" : "clean fit"
  };
}

function scoreCombinations(cleanItems) {
  const cleanMap = new Map(cleanItems.map((item) => [item.id, item]));

  return state.combinations
    .map((combo) => {
      const items = combo.itemIds.map((id) => cleanMap.get(id)).filter(Boolean);

      if (items.length !== combo.itemIds.length) {
        return null;
      }

      const recentPenalty = items.filter((item) => item.recentlyWorn).length * 2;
      const totalWear = items.reduce((sum, item) => sum + item.wearCount, 0);
      const tasteScore = getTasteScoreForItems(items);

      return {
        ...combo,
        score: combo.wearCount * 10 + totalWear + tasteScore - recentPenalty
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
}

function withWildcard(combo, cleanItems) {
  const comboItems = combo.itemIds
    .map((id) => state.wardrobe.find((item) => item.id === id))
    .filter(Boolean);
  const typeCounts = groupByType(cleanItems);
  const swappableTypes = ["Accessory", "Outerwear", "Top", "Shoes"];

  for (const type of swappableTypes) {
    const selected = comboItems.find((item) => item.type === type);
    const alternatives = (typeCounts[type] || [])
      .filter((item) => item.id !== selected?.id && !combo.itemIds.includes(item.id))
      .sort((a, b) => a.wearCount - b.wearCount);

    if (selected && alternatives.length) {
      const replacement = alternatives[0];
      const itemIds = combo.itemIds.map((id) => (id === selected.id ? replacement.id : id));

      return {
        ...combo,
        itemIds,
        label: `${combo.label} fresh pull`
      };
    }
  }

  return combo;
}

function assembleFromPieces(cleanItems, wildcard) {
  const grouped = groupByType(cleanItems);
  const picks = [];

  const requiredTypes = ["Top", "Bottom", "Shoes"];
  requiredTypes.forEach((type) => {
    const options = sortForSelection(grouped[type] || [], wildcard);
    if (options[0]) {
      picks.push(options[0]);
    }
  });

  ["Outerwear", "Accessory"].forEach((type) => {
    const options = sortForSelection(grouped[type] || [], wildcard);
    if (options[0]) {
      picks.push(options[0]);
    }
  });

  return picks;
}

function sortForSelection(items, wildcard) {
  return [...items].sort((a, b) => {
    const tasteA = getTasteScoreForItems([a]);
    const tasteB = getTasteScoreForItems([b]);
    const scoreA = wildcard ? a.wearCount + tasteA * 0.6 - (a.recentlyWorn ? 3 : 0) : a.wearCount * 2 + tasteA - (a.recentlyWorn ? 4 : 0);
    const scoreB = wildcard ? b.wearCount + tasteB * 0.6 - (b.recentlyWorn ? 3 : 0) : b.wearCount * 2 + tasteB - (b.recentlyWorn ? 4 : 0);

    if (wildcard) {
      return scoreB - scoreA;
    }

    return scoreB - scoreA;
  });
}

function describeSuggestion(items, { wildcard, fromHistory, tasteLed }) {
  const names = items.map((item) => item.name);
  const anchors = names.slice(0, 2).join(" and ");
  const colorStory = items.map((item) => item.color).slice(0, 3).join(", ");
  const tasteLine = tasteLed ? " It leans into the colors and item types you interact with most." : "";

  if (wildcard && fromHistory) {
    return `${anchors} are already part of a combination you replay often, but tela swapped in a lower-rotation piece to keep the energy fresh.${tasteLine} Palette cue: ${colorStory}.`;
  }

  if (fromHistory) {
    return `${anchors} show up together in one of your most worn combinations. Tela kept the whole fit clean, familiar, and easy to reach for.${tasteLine} Palette cue: ${colorStory}.`;
  }

  if (wildcard) {
    return `No full clean combo was available, so tela rebuilt the look from your closet's strongest pieces and leaned toward less-repeated options.${tasteLine} Palette cue: ${colorStory}.`;
  }

  return `No saved combination could run clean today, so tela rebuilt a dependable outfit from the pieces you wear the most.${tasteLine} Palette cue: ${colorStory}.`;
}

function applySuggestionWear() {
  if (!state.suggestion || !state.suggestion.items.length) {
    return;
  }

  const ids = state.suggestion.items.map((item) => item.id);
  logWornOutfit(ids, state.suggestion.title);
  state.suggestion = composeSuggestion({ wildcard: false });
  saveState();
  render();
}

function logWornOutfit(itemIds, title) {
  const today = todayIso();

  state.wardrobe.forEach((item) => {
    if (itemIds.includes(item.id)) {
      item.wearCount += 1;
      item.recentlyWorn = true;
      item.lastWorn = today;
    }
  });

  upsertCombination(itemIds, title);
  state.suggestion = composeSuggestion({ wildcard: false });
  saveState();
  render();
}

function upsertCombination(itemIds, title) {
  const sortedIds = [...itemIds].sort();
  const existing = state.combinations.find((combo) => sameItems(combo.itemIds, sortedIds));

  if (existing) {
    existing.wearCount += 1;
    existing.lastWorn = todayIso();
    return;
  }

  state.combinations.unshift({
    id: uid("combo"),
    itemIds: sortedIds,
    wearCount: 1,
    label: title,
    lastWorn: todayIso()
  });
}

function buildInspoResult({ style, energy, note }) {
  const preset = STYLE_PRESETS[style] || STYLE_PRESETS.gorpcore;
  const muse = randomFrom(preset.musePool);
  const title = randomFrom(preset.titlePool);
  const prompt = `${preset.label} outfit inspiration, ${muse}, ${energy} mood, ${preset.pieces.join(", ")}. ${note || preset.narrative}`;

  return {
    style,
    styleLabel: preset.label,
    energy,
    title,
    description: `${muse} with ${energy} energy. ${note || preset.narrative}`,
    pieces: preset.pieces,
    prompt,
    image: createInspoImage({ preset, title, muse, energy })
  };
}

function tickPromptClock() {
  maybeTriggerPrompt();
  renderPrompt();
}

function maybeTriggerPrompt() {
  const active = state.explore.activePrompt;

  if (active && new Date(active.expiresAt).getTime() <= Date.now()) {
    state.explore.activePrompt = null;
    state.explore.nextPromptAt = nextPromptTime();
    saveState();
  }

  if (!state.explore.nextPromptAt) {
    state.explore.nextPromptAt = nextPromptTime();
    saveState();
  }

  if (new Date(state.explore.nextPromptAt).getTime() <= Date.now() && !state.explore.activePrompt) {
    triggerFitPrompt();
  }
}

function triggerFitPrompt() {
  state.explore.activePrompt = {
    message: randomFrom(PROMPT_MESSAGES),
    startedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    presentedAt: null
  };
  state.explore.nextPromptAt = nextPromptTime();
  saveState();
  renderPrompt();

  if (state.explore.notifications && "Notification" in window && Notification.permission === "granted") {
    new Notification("tela fit check", {
      body: "Time to post your outfit and tag the pieces."
    });
  }

  maybeShowFitcheckModal();
}

async function enableNotifications() {
  if (!("Notification" in window)) {
    flashMessage("Browser notifications are not supported here.");
    return;
  }

  const result = await Notification.requestPermission();

  if (result === "granted") {
    state.explore.notifications = true;
    saveState();
    flashMessage("Notifications enabled for surprise fit checks.");
    return;
  }

  flashMessage("Notification permission was not granted.");
}

function getCleanItems() {
  return state.wardrobe.filter((item) => !item.dirty);
}

function getFavoriteCombo() {
  return [...state.combinations].sort((a, b) => b.wearCount - a.wearCount)[0] || null;
}

function comboPiecesLabel(itemIds) {
  return itemIds
    .map((id) => state.wardrobe.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => item.name);
}

function splitList(value) {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function buildOutfitName(itemIds) {
  const items = itemIds
    .map((id) => state.wardrobe.find((item) => item.id === id))
    .filter(Boolean);
  const names = items.slice(0, 2).map((item) => item.name);
  return names.length ? `${names.join(" / ")} fit` : "Saved outfit";
}

function getClosetTypes() {
  return getClosetTypesForWardrobe(state.wardrobe);
}

function getClosetTypesForWardrobe(wardrobe) {
  const preferredTypes = ["All", "Top", "Bottom", "Outerwear", "Shoes", "Accessory"];
  const existingTypes = new Set(wardrobe.map((item) => item.type));
  const customTypes = [...existingTypes].filter((type) => !preferredTypes.includes(type)).sort();
  return [...preferredTypes, ...customTypes];
}

function getValidClosetType(value) {
  return getClosetTypes().includes(value) ? value : "All";
}

function getValidClosetTypeForWardrobe(value, wardrobe) {
  return getClosetTypesForWardrobe(wardrobe).includes(value) ? value : "All";
}

function getClosetColors() {
  const colors = [...new Set(state.wardrobe.map((item) => normalizeColorLabel(item.color)))];
  return colors.sort((a, b) => a.localeCompare(b));
}

function getFilteredWardrobe() {
  const typeFilter = state.ui.closetTypeFilter;
  const colorFilters = state.ui.closetColorFilters;

  return state.wardrobe.filter((item) => {
    const typeMatches = typeFilter === "All" || item.type === typeFilter;
    const colorMatches = !colorFilters.length || colorFilters.includes(normalizeColorLabel(item.color));
    return typeMatches && colorMatches;
  });
}

function getFilteredPosts() {
  const query = state.ui.exploreSearch.toLowerCase();
  const posts = state.posts
    .filter((post) => {
      if (!query) {
        return true;
      }

      const haystack = [
        post.user,
        post.caption,
        post.location,
        post.handle,
        ...(post.pieces || []),
        ...(post.brands || []),
        ...(post.dominantColors || []),
        ...(post.styleTags || [])
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    })
    .map((post) => ({
      post,
      score: scoreExplorePost(post)
    }))
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.post);

  return posts;
}

function scoreExplorePost(post) {
  return (post.likeCount || 0) + getTasteScoreForPost(post) + (isSavedPost(post.id) ? 20 : 0) + (isLikedPost(post.id) ? 28 : 0);
}

function getOwnPosts() {
  return state.posts.filter((post) => isOwnPost(post));
}

function getSavedPosts() {
  return state.posts.filter((post) => state.savedPostIds.includes(post.id) && !isOwnPost(post));
}

function isOwnPost(post) {
  return post.handle === currentUserHandle();
}

function currentUserHandle() {
  return state.ui.user?.name ? `@${slugifyHandle(state.ui.user.name)}` : "@you";
}

function isSavedPost(postId) {
  return state.savedPostIds.includes(postId);
}

function isLikedPost(postId) {
  return state.likedPostIds.includes(postId);
}

function toggleSavedPost(postId) {
  if (!postId) {
    return;
  }

  if (state.savedPostIds.includes(postId)) {
    state.savedPostIds = state.savedPostIds.filter((id) => id !== postId);
    saveState();
    flashMessage("Removed from saved outfits.");
    return;
  }

  state.savedPostIds = [postId, ...state.savedPostIds];
  saveState();
  flashMessage("Saved to your profile.");
}

function toggleLikedPost(postId) {
  if (!postId) {
    return;
  }

  const post = state.posts.find((entry) => entry.id === postId);

  if (!post) {
    return;
  }

  if (state.likedPostIds.includes(postId)) {
    state.likedPostIds = state.likedPostIds.filter((id) => id !== postId);
    post.likeCount = Math.max((post.likeCount || 1) - 1, 0);
    saveState();
    flashMessage("Like removed.");
    return;
  }

  state.likedPostIds = [postId, ...state.likedPostIds];
  post.likeCount = (post.likeCount || 0) + 1;
  saveState();
  flashMessage("Post liked.");
}

function getTasteProfile() {
  const profile = {
    colors: new Map(),
    types: new Map(),
    styles: new Map()
  };

  const addWeight = (map, label, amount) => {
    if (!label) {
      return;
    }

    const normalized = normalizeColorLabel(label).toLowerCase();
    map.set(normalized, (map.get(normalized) || 0) + amount);
  };

  state.wardrobe.forEach((item) => {
    addWeight(profile.colors, item.color, item.wearCount * 0.9);
    addWeight(profile.types, item.type, item.wearCount * 1.2);
  });

  state.posts.forEach((post) => {
    const weight = (isLikedPost(post.id) ? 8 : 0) + (isSavedPost(post.id) ? 6 : 0) + (isOwnPost(post) ? 5 : 0);

    if (!weight) {
      return;
    }

    (post.dominantColors || []).forEach((color) => addWeight(profile.colors, color, weight));
    (post.clothingTypes || []).forEach((type) => addWeight(profile.types, type, weight));
    (post.styleTags || []).forEach((style) => addWeight(profile.styles, style, weight));
  });

  return profile;
}

function getTasteScoreForPost(post) {
  const taste = getTasteProfile();
  let score = 0;

  (post.dominantColors || []).forEach((color) => {
    score += taste.colors.get(normalizeColorLabel(color).toLowerCase()) || 0;
  });

  (post.clothingTypes || []).forEach((type) => {
    score += taste.types.get(normalizeColorLabel(type).toLowerCase()) || 0;
  });

  (post.styleTags || []).forEach((style) => {
    score += taste.styles.get(normalizeColorLabel(style).toLowerCase()) || 0;
  });

  return score;
}

function getTasteScoreForItems(items) {
  const taste = getTasteProfile();
  return items.reduce((total, item) => {
    const colorWeight = taste.colors.get(normalizeColorLabel(item.color).toLowerCase()) || 0;
    const typeWeight = taste.types.get(normalizeColorLabel(item.type).toLowerCase()) || 0;
    return total + colorWeight + typeWeight;
  }, 0);
}

function inferPostColorsFromCloset() {
  return [...state.wardrobe]
    .sort((a, b) => b.wearCount - a.wearCount)
    .slice(0, 3)
    .map((item) => normalizeColorLabel(item.color).toLowerCase());
}

function inferPostTypesFromPieces(pieces) {
  const matches = new Set();
  const lookup = [
    ["sweater", "Top"],
    ["shirt", "Top"],
    ["tee", "Top"],
    ["knit", "Top"],
    ["puffer", "Outerwear"],
    ["jacket", "Outerwear"],
    ["coat", "Outerwear"],
    ["pant", "Bottom"],
    ["trouser", "Bottom"],
    ["jean", "Bottom"],
    ["cargo", "Bottom"],
    ["loafer", "Shoes"],
    ["shoe", "Shoes"],
    ["boot", "Shoes"],
    ["sneaker", "Shoes"],
    ["bag", "Accessory"],
    ["beanie", "Accessory"],
    ["belt", "Accessory"]
  ];

  pieces.forEach((piece) => {
    const lower = piece.toLowerCase();
    lookup.forEach(([needle, type]) => {
      if (lower.includes(needle)) {
        matches.add(type);
      }
    });
  });

  return [...matches];
}

function inferStyleTagsForPost() {
  const taste = getTasteProfile();
  return [...taste.styles.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 2)
    .map(([style]) => style);
}

function toggleClosetColorFilter(color) {
  const normalized = normalizeColorLabel(color);
  const colorFilters = state.ui.closetColorFilters;

  if (colorFilters.includes(normalized)) {
    state.ui.closetColorFilters = colorFilters.filter((entry) => entry !== normalized);
    return;
  }

  state.ui.closetColorFilters = [...colorFilters, normalized];
}

function groupByType(items) {
  return items.reduce((groups, item) => {
    if (!groups[item.type]) {
      groups[item.type] = [];
    }
    groups[item.type].push(item);
    return groups;
  }, {});
}

function formatDate(value) {
  const parsed = parseDateValue(value);

  if (!parsed) {
    return "Unknown";
  }

  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });
}

function compareDateDesc(left, right) {
  const leftDate = parseDateValue(left);
  const rightDate = parseDateValue(right);
  const leftTime = leftDate ? leftDate.getTime() : 0;
  const rightTime = rightDate ? rightDate.getTime() : 0;
  return rightTime - leftTime;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function todayIso() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function nextPromptTime() {
  const minutes = 60 + Math.floor(Math.random() * 660);
  return new Date(Date.now() + minutes * 60000).toISOString();
}

function sameItems(left, right) {
  const leftSorted = [...left].sort();
  const rightSorted = [...right].sort();
  return leftSorted.length === rightSorted.length && leftSorted.every((value, index) => value === rightSorted[index]);
}

function parseDateValue(value) {
  if (!value) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day, 12);
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shortenText(value, maxLength) {
  const text = String(value);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trim()}...`;
}

function slugifyHandle(value) {
  const handle = String(value).toLowerCase().replaceAll(/[^a-z0-9]+/g, "");
  return handle || "telauser";
}

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function flashMessage(message) {
  window.clearTimeout(toastTimer);
  app.statusMessage.textContent = message;
  app.statusMessage.classList.add("visible");
  toastTimer = window.setTimeout(() => {
    app.statusMessage.classList.remove("visible");
  }, 2600);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function colorToHex(colorName) {
  const lower = normalizeColorLabel(colorName).toLowerCase();
  const hit = Object.entries(COLOR_MAP).find(([key]) => lower.includes(key));
  return hit ? hit[1] : "#d6c2aa";
}

function normalizeColorLabel(colorName) {
  const label = String(colorName || "").trim();
  return label || "Untagged";
}

function createGarmentImage(item) {
  const base = colorToHex(item.color);
  const accent = shiftHex(base, -28);
  const secondary = shiftHex(base, 42);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${secondary}" />
          <stop offset="100%" stop-color="${base}" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" rx="48" fill="url(#bg)" />
      <circle cx="110" cy="110" r="80" fill="rgba(255,255,255,0.18)" />
      <path d="M180 200 C220 150 380 150 420 200 L460 360 C474 420 428 470 368 470 H232 C172 470 126 420 140 360 Z" fill="${accent}" opacity="0.9" />
      <rect x="165" y="245" width="270" height="180" rx="42" fill="${base}" />
      <circle cx="492" cy="110" r="46" fill="rgba(255,255,255,0.18)" />
      <path d="M160 458 C224 408 330 520 434 432" fill="none" stroke="rgba(255,250,243,0.66)" stroke-width="20" stroke-linecap="round" />
    </svg>
  `;

  return svgDataUrl(svg);
}

function createMixCover(suggestion) {
  const items = suggestion?.items?.length ? suggestion.items : getCleanItems().slice(0, 5);
  const colors = items.map((item) => colorToHex(item.color));
  const primary = colors[0] || "#ff7a21";
  const secondary = colors[1] || "#23324f";
  const tertiary = colors[2] || "#eadcc7";
  const quaternary = colors[3] || "#39533d";
  const title = suggestion?.title || "tela mix";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700">
      <defs>
        <linearGradient id="mix" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="700" height="700" rx="70" fill="url(#mix)" />
      <circle cx="560" cy="140" r="135" fill="${tertiary}" opacity="0.42" />
      <circle cx="130" cy="590" r="170" fill="${quaternary}" opacity="0.42" />
      <rect x="88" y="130" width="230" height="300" rx="48" fill="${primary}" opacity="0.9" />
      <rect x="248" y="210" width="220" height="350" rx="54" fill="${secondary}" opacity="0.92" />
      <rect x="406" y="150" width="180" height="280" rx="46" fill="${tertiary}" opacity="0.9" />
      <path d="M120 488 C210 448 308 612 410 522 C500 442 536 506 610 472" fill="none" stroke="#fffaf3" stroke-width="26" stroke-linecap="round" opacity="0.9" />
      <text x="62" y="80" fill="#fffaf3" font-family="Avenir Next, Helvetica, sans-serif" font-size="20" letter-spacing="4">TELA MIX</text>
      <text x="62" y="640" fill="#fffaf3" font-family="Georgia, serif" font-size="48">${escapeXml(shortenText(title, 24))}</text>
    </svg>
  `;

  return svgDataUrl(svg);
}

function createInspoImage({ preset, title, muse, energy }) {
  const [bg, depth, neutral] = preset.palette;
  const [accentA, accentB, accentC] = preset.accents;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="wash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bg}" />
          <stop offset="100%" stop-color="${depth}" />
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="40" />
        </filter>
      </defs>
      <rect width="800" height="1000" fill="${neutral}" />
      <rect width="800" height="1000" fill="url(#wash)" opacity="0.88" />
      <circle cx="120" cy="150" r="120" fill="${accentA}" opacity="0.45" filter="url(#blur)" />
      <circle cx="690" cy="210" r="140" fill="${accentB}" opacity="0.38" filter="url(#blur)" />
      <circle cx="630" cy="780" r="170" fill="${accentC}" opacity="0.35" filter="url(#blur)" />
      <g transform="translate(200 170)">
        <ellipse cx="190" cy="95" rx="72" ry="82" fill="#7a573f" />
        <path d="M110 78 C140 10 255 0 285 72 L280 135 H118 Z" fill="${preset.hatColor}" />
        <rect x="155" y="150" width="70" height="58" rx="22" fill="#6c4a33" />
        <path d="M22 220 C60 145 330 145 368 220 L406 460 C420 525 380 592 310 600 H98 C30 592 -10 525 4 460 Z" fill="${preset.jacketColor}" />
        <path d="M120 592 H188 V860 H106 C86 860 70 844 70 824 V670 C70 635 90 606 120 592 Z" fill="${preset.pantsColor}" />
        <path d="M214 592 H282 C312 606 332 635 332 670 V824 C332 844 316 860 296 860 H214 Z" fill="${preset.pantsColor}" />
        <rect x="70" y="860" width="140" height="40" rx="18" fill="${preset.shoeColor}" />
        <rect x="190" y="860" width="160" height="40" rx="18" fill="${preset.shoeColor}" />
        <path d="M30 245 C0 330 4 470 46 552 H108 C84 448 76 352 86 245 Z" fill="${preset.jacketColor}" />
        <path d="M358 245 C388 330 384 470 342 552 H280 C304 448 312 352 302 245 Z" fill="${preset.jacketColor}" />
      </g>
      <text x="54" y="76" fill="#fffaf3" font-family="Avenir Next, Helvetica, sans-serif" font-size="18" letter-spacing="4">TELA INSPO</text>
      <text x="54" y="886" fill="#fffaf3" font-family="Georgia, serif" font-size="62">${escapeXml(title)}</text>
      <text x="54" y="928" fill="#fffaf3" font-family="Avenir Next, Helvetica, sans-serif" font-size="22">${escapeXml(muse)} / ${escapeXml(energy)}</text>
    </svg>
  `;

  return svgDataUrl(svg);
}

function createPostImage(post) {
  const [bg, depth, neutral] = post.palette;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="wash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bg}" />
          <stop offset="100%" stop-color="${depth}" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="${neutral}" />
      <rect width="800" height="1000" fill="url(#wash)" opacity="0.88" />
      <circle cx="660" cy="160" r="120" fill="#ffffff" opacity="0.18" />
      <g transform="translate(205 190)">
        <ellipse cx="180" cy="90" rx="70" ry="78" fill="#6d4c36" />
        <rect x="132" y="148" width="95" height="60" rx="26" fill="#5d412c" />
        <path d="M38 220 C74 160 286 160 322 220 L360 460 C374 520 330 580 272 592 H88 C30 580 -14 520 0 460 Z" fill="${bg}" />
        <path d="M106 590 H182 V850 H96 C76 850 60 834 60 814 V664 C60 632 78 606 106 590 Z" fill="${depth}" />
        <path d="M198 590 H274 C302 606 320 632 320 664 V814 C320 834 304 850 284 850 H198 Z" fill="${depth}" />
        <rect x="54" y="850" width="152" height="38" rx="18" fill="#191919" />
        <rect x="184" y="850" width="152" height="38" rx="18" fill="#191919" />
      </g>
      <text x="46" y="78" fill="#fffaf3" font-family="Avenir Next, Helvetica, sans-serif" font-size="20" letter-spacing="4">${escapeXml(post.location.toUpperCase())}</text>
      <text x="46" y="910" fill="#fffaf3" font-family="Georgia, serif" font-size="54">${escapeXml(post.user)}</text>
    </svg>
  `;

  return svgDataUrl(svg);
}

function createAvatarImage(name) {
  const initials = String(name || "T")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
      <defs>
        <linearGradient id="avatar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff7a21" />
          <stop offset="100%" stop-color="#23324f" />
        </linearGradient>
      </defs>
      <rect width="320" height="320" rx="160" fill="url(#avatar)" />
      <circle cx="160" cy="160" r="116" fill="rgba(255,255,255,0.14)" />
      <text x="160" y="188" text-anchor="middle" fill="#fffaf3" font-family="Avenir Next, Helvetica, sans-serif" font-size="108" font-weight="600">${escapeXml(initials || "T")}</text>
    </svg>
  `;

  return svgDataUrl(svg);
}

function svgDataUrl(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function shiftHex(hex, amount) {
  const normalized = hex.replace("#", "");
  const parsed = Number.parseInt(normalized, 16);
  const r = clamp(((parsed >> 16) & 255) + amount, 0, 255);
  const g = clamp(((parsed >> 8) & 255) + amount, 0, 255);
  const b = clamp((parsed & 255) + amount, 0, 255);
  return `#${[r, g, b].map((part) => part.toString(16).padStart(2, "0")).join("")}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
