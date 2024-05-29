import container_creator from "./ClientEntries";

import {describe, it} from "@testing-library/jest-dom";

describe("Building panels", () => {
    it("Should be built", () => {
        container_creator.Create();
    })
})