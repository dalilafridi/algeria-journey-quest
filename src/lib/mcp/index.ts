import { defineMcp } from "@lovable.dev/mcp-js";
import listFiguresTool from "./tools/list-figures";
import getFigureTool from "./tools/get-figure";
import listRegionsTool from "./tools/list-regions";
import getRegionTool from "./tools/get-region";
import listCultureTopicsTool, { getCultureTopicTool } from "./tools/culture";
import { listJourneysTool, getJourneyTool } from "./tools/journeys";
import { listErasTool, getEraTool } from "./tools/eras";

export default defineMcp({
  name: "algeria-through-time",
  title: "Algeria Through Time",
  version: "0.1.0",
  instructions:
    "Museum-style knowledge base of Algerian history. Use list_* tools to browse figures, eras, regions, culture topics, and signature journeys, then get_* tools to open a full exhibit. All content is available in English (default), French ('fr'), or Arabic ('ar') via the optional `lang` argument.",
  tools: [
    listFiguresTool,
    getFigureTool,
    listErasTool,
    getEraTool,
    listRegionsTool,
    getRegionTool,
    listCultureTopicsTool,
    getCultureTopicTool,
    listJourneysTool,
    getJourneyTool,
  ],
});
