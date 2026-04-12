import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

const CARD_GAP = 10;
const CARD_WIDTH = (width - 32 - CARD_GAP) / 2;

// ─── Design Tokens ────────────────────────────────────────────────────────────
export const colors = {
  bg: "#0a0a0a",
  surface: "#1a1a1a",
  surfaceAlt: "#262626",
  border: "#2a2a2a",
  accent: "#4ade80",
  accentDim: "rgba(74,222,128,0.15)",
  white: "#ffffff",
  textPrimary: "#ffffff",
  textSecondary: "#a0a0a0",
  textMuted: "#606060",
  danger: "#ef4444",
  dangerDim: "rgba(239,68,68,0.15)",
  overlay: "rgba(0,0,0,0.7)",
};

export const styles = StyleSheet.create({
  // ── Screen layout ──────────────────────────────────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Header ─────────────────────────────────────────────────────────────────
  screenTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: 0.5,
    textAlign: "left",
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  headerRight: {
    width: 40,
  },

  // ── Search ─────────────────────────────────────────────────────────────────
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    paddingVertical: 0,
  },

  // ── Section ────────────────────────────────────────────────────────────────
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 4,
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  // ── Category tiles (For You, Featured) ────────────────────────────────────
  categoryTilesRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: CARD_GAP,
    marginBottom: 20,
  },
  categoryTile: {
    flex: 1,
    height: 90,
    borderRadius: 16,
    backgroundColor: "#2C2C2E",
    justifyContent: "center",
    padding: 16,
    overflow: "hidden",
    position: "relative",
  },
  categoryTileImage: {
    position: "absolute",
    right: 5,
    top: 5,
    width: 60,
    height: 80,
    borderRadius: 6,
    transform: [{ rotate: "5deg" }],
  },
  categoryTileOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  categoryTileText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 15,
    zIndex: 1,
    width: "70%",
  },

  // ── Discover grid ──────────────────────────────────────────────────────────
  discoverGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: CARD_GAP,
    marginBottom: 24,
  },
  discoverTile: {
    width: CARD_WIDTH,
    height: 100,
    borderRadius: 16,
    backgroundColor: "#2C2C2E",
    overflow: "hidden",
    justifyContent: "center",
    padding: 16,
    position: "relative",
  },
  discoverTileImage: {
    position: "absolute",
    right: 5,
    top: 10,
    width: 60,
    height: 80,
    borderRadius: 6,
    transform: [{ rotate: "5deg" }],
  },
  discoverTileOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  discoverTileText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 15,
    zIndex: 1,
    width: "60%",
  },

  // ── Category Filter pills (inside a category screen) ───────────────────────
  filterRow: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  filterPillText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  filterPillTextActive: {
    color: colors.bg,
  },

  // ── Template Masonry card ──────────────────────────────────────────────────
  masonryContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: CARD_GAP,
  },
  masonryColumn: {
    flex: 1,
    gap: CARD_GAP,
  },
  templateCard: {
    borderRadius: 16,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  templateThumb: {
    width: "100%",
    backgroundColor: colors.surfaceAlt,
  },
  templateThumbPlaceholder: {
    width: "100%",
    aspectRatio: 0.75,
    backgroundColor: colors.surfaceAlt,
    justifyContent: "center",
    alignItems: "center",
  },
  templateCardInfo: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  templateCardName: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  templateCardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  templateCardMetaText: {
    color: colors.textMuted,
    fontSize: 11,
  },
  templateMenuBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  // ── Preview Modal ──────────────────────────────────────────────────────────
  previewOverlay: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  previewHeaderTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  previewSingleImageWrapper: {
    flex: 1,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  previewFooter: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 36 : 20,
    paddingTop: 12,
    backgroundColor: colors.bg,
  },
  previewMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  previewMetaLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  previewBrand: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  previewSubMeta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  previewMetaIcons: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  useTemplateBtn: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  useTemplateBtnText: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.bg,
  },
  useTemplateBtnDisabled: {
    opacity: 0.5,
  },

  // ── Action Menu ────────────────────────────────────────────────────────────
  actionMenuOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "flex-end",
  },
  actionMenuSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    paddingTop: 16,
  },
  actionMenuHandle: {
    width: 36,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  actionMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 14,
  },
  actionMenuText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  actionMenuDangerText: {
    color: colors.danger,
  },
  actionMenuDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  actionMenuClose: {
    marginTop: 8,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  actionMenuCloseText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textSecondary,
  },

  // ── Misc ───────────────────────────────────────────────────────────────────
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: "center",
    marginTop: 40,
  },
  fabButton: {
    position: "absolute",
    bottom: 28,
    right: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  // ── Error & Loading ────────────────────────────────────────────────────────
  errorContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: colors.dangerDim,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.3)",
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  categoriesList: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});
