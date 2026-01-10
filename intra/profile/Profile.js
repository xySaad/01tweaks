import waitForElement from "../../lib/waitElement.js";
import html from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
import { RootEvents } from "../components/Event/RootEvents.js";
const { div } = html;
const wrap = div({ class: "actionsWrap" });

export const Profile = async () => {
  wrap.innerHTML = "";
  const quickActions = await waitForElement(
    "html body.dark-theme div#root div div div div.mt10-01.w100p-01.pv11-01.ph12-01.pv7_s-01.ph9_s-01 div.bgLevel2-01.ph4-01.pv3-01.mb4-01"
  );
  const startWorkingParent = await waitForElement(
    "html body.dark-theme div#root div div div div.mt10-01.w100p-01.pv11-01.ph12-01.pv7_s-01.ph9_s-01 div.alignEnd-01.justifyBetween-01.mb4-01 div.alignCenter-01"
  );

  //move margin to wrapper
  wrap.style.margin = getComputedStyle(quickActions).margin;
  quickActions.style.margin = "0";
  quickActions.style.justifyContent = "center";

  //wrap quick actions
  const [hideQuickActions, startWorking] = startWorkingParent.children;
  hideQuickActions.remove(); //TODO: add an alternative

  startWorking.classList.add("startWorking");
  quickActions.lastChild.firstChild.remove(); // switch program button

  wrap.add(quickActions, startWorking, await RootEvents());
  quickActions.replaceWith(wrap);
  wrap.mount();

  //how did that even got there?
  const progTimeline = await waitForElement(
    "html body.dark-theme div#root div div div div.mt10-01.w100p-01.pv11-01.ph12-01.pv7_s-01.ph9_s-01 div.grid-01.mt8-01.mt6_s-01.w100p-01 div.flexColumn-01.gridColumnSpan2-01.gridColumnSpan1_s-01.gridRowSpan3_s-01 div.bgGreyHighlighted-01.flex1-01.aShadow-01 div.alt-theme.pv5-01.ph4-01.textMinimal-01.relative-01.flexColumn-01.w100p-01.h100p-01 div.alignStart-01.h100p-01 div.ml4-01.pt3-01.w100p-01.h100p-01.flexColumn-01.justifyBetween-01 div.justifyEnd-01"
  );
  progTimeline.parentNode.firstChild.appendChild(progTimeline);
};
