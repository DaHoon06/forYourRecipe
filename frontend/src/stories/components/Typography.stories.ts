import Typography from "@/components/common/custom/CustomFont.vue";

export default {
  title: "components/Typography",
  component: Typography,
};

export const defaultFontKor = () => ({
  components: { Typography },
  template:
    '<typography type="kor">디폴트 한글 14px, regular, black</typography>',
});
defaultFontKor.storyName = "Default Kor Font";

export const defaultFontEng = () => ({
  components: { Typography },
  template:
    '<typography type="eng">default english font 14px, regular, black</typography>',
});
defaultFontEng.storyName = "Default English Font";

export const defaultFontColorBlack = () => ({
  components: { Typography },
  template: `
    <typography type="eng" color="black" weight="regular" size="12">black - regular (min 12px)</typography><br/>
    <typography type="eng" color="black" weight="normal" size="13">black - normal (13px)</typography><br/>
    <typography type="eng" color="black" weight="medium" size="16">black - medium (16px)</typography><br/>
    <typography type="eng" color="black" weight="semiBold" size="20">black - semiBold (20px)</typography><br/>
    <typography type="eng" color="black" weight="bold" size="26">black - bold (max 26px)</typography>
  `,
});
defaultFontColorBlack.storyName = "Font Black";

export const defaultFontColorWhite = () => ({
  components: { Typography },
  template: `
    <div style="background-color: black">
    <typography type="eng" color="white" weight="regular" size="12">white - regular (min 12px)</typography>
    <br/>
    <typography type="eng" color="white" weight="normal" size="13">white - normal (13px)</typography>
    <br/>
    <typography type="eng" color="white" weight="medium" size="16">white - medium (16px)</typography>
    <br/>
    <typography type="eng" color="white" weight="semiBold" size="20">white - semiBold (20px)</typography>
    <br/>
    <typography type="eng" color="white" weight="bold" size="26">white - bold (max 26px)</typography>
    </div>
  `,
});
defaultFontColorWhite.storyName = "Font white";

export const defaultFontColorTextTitle = () => ({
  components: { Typography },
  template: `
    <typography type="eng" color="textTitle" weight="regular" size="12">textTitle - regular (min 12px)</typography><br/>
    <typography type="eng" color="textTitle" weight="normal" size="13">textTitle - normal (13px)</typography><br/>
    <typography type="eng" color="textTitle" weight="medium" size="16">textTitle - medium (16px)</typography><br/>
    <typography type="eng" color="textTitle" weight="semiBold" size="20">textTitle - semiBold (20px)</typography><br/>
    <typography type="eng" color="textTitle" weight="bold" size="26">textTitle - bold (max 26px)</typography>
  `,
});
defaultFontColorTextTitle.storyName = "Font textTitle";

export const defaultFontColorTextSub = () => ({
  components: { Typography },
  template: `
    <typography type="eng" color="textSub" weight="regular" size="12">textSub - regular (min 12px)</typography><br/>
    <typography type="eng" color="textSub" weight="normal" size="13">textSub - normal (13px)</typography><br/>
    <typography type="eng" color="textSub" weight="medium" size="16">textSub - medium (16px)</typography><br/>
    <typography type="eng" color="textSub" weight="semiBold" size="20">textSub - semiBold (20px)</typography><br/>
    <typography type="eng" color="textSub" weight="bold" size="26">textSub - bold (max 26px)</typography>
  `,
});
defaultFontColorTextSub.storyName = "Font textSub";

export const defaultFontColorPlaceholder = () => ({
  components: { Typography },
  template: `
    <typography type="eng" color="placeholder" weight="regular" size="12">placeholder - regular (min 12px)</typography>
    <br/>
    <typography type="eng" color="placeholder" weight="normal" size="13">placeholder - normal (13px)</typography><br/>
    <typography type="eng" color="placeholder" weight="medium" size="16">placeholder - medium (16px)</typography><br/>
    <typography type="eng" color="placeholder" weight="semiBold" size="20">placeholder - semiBold (20px)</typography>
    <br/>
    <typography type="eng" color="placeholder" weight="bold" size="26">placeholder - bold (max 26px)</typography>
  `,
});
defaultFontColorPlaceholder.storyName = "Font placeholder";

export const defaultFontColorRed = () => ({
  components: { Typography },
  template: `
    <typography type="eng" color="red" weight="regular" size="12">red - regular (min 12px)</typography>
    <br/>
    <typography type="eng" color="red" weight="normal" size="13">red - normal (13px)</typography><br/>
    <typography type="eng" color="red" weight="medium" size="16">red - medium (16px)</typography><br/>
    <typography type="eng" color="red" weight="semiBold" size="20">red - semiBold (20px)</typography>
    <br/>
    <typography type="eng" color="red" weight="bold" size="26">red - bold (max 26px)</typography>
  `,
});
defaultFontColorRed.storyName = "Font red";

export const defaultFontColorGray = () => ({
  components: { Typography },
  template: `
    <typography type="eng" color="gray" weight="regular" size="12">gray - regular (min 12px)</typography>
    <br/>
    <typography type="eng" color="gray" weight="normal" size="13">gray - normal (13px)</typography><br/>
    <typography type="eng" color="gray" weight="medium" size="16">gray - medium (16px)</typography><br/>
    <typography type="eng" color="gray" weight="semiBold" size="20">gray - semiBold (20px)</typography>
    <br/>
    <typography type="eng" color="gray" weight="bold" size="26">gray - bold (max 26px)</typography>
  `,
});
defaultFontColorGray.storyName = "Font gray";

export const defaultFontColorGray2 = () => ({
  components: { Typography },
  template: `
    <typography type="eng" color="gray2" weight="regular" size="12">gray2 - regular (min 12px)</typography>
    <br/>
    <typography type="eng" color="gray2" weight="normal" size="13">gray2 - normal (13px)</typography><br/>
    <typography type="eng" color="gray2" weight="medium" size="16">gray2 - medium (16px)</typography><br/>
    <typography type="eng" color="gray2" weight="semiBold" size="20">gray2 - semiBold (20px)</typography>
    <br/>
    <typography type="eng" color="gray2" weight="bold" size="26">gray2 - bold (max 26px)</typography>
  `,
});
defaultFontColorGray2.storyName = "Font gray2";
