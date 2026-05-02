import { lookProyectToolDefinition } from "./lookProyectInformation.server";

import { listProjectsWithChangesDefinition } from "./listProjectsWithChanges.server";
import { listProjectChangesByNameDefinition } from "./listProjectChangesByName.server";
import { listProjectsAllDefinition } from "./listProjectsWithoutChanges.server";

export const tools = [
    lookProyectToolDefinition,
    listProjectsAllDefinition,
    listProjectsWithChangesDefinition,
    listProjectChangesByNameDefinition,
]