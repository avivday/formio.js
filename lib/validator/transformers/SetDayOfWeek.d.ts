export class SetDayOfWeekTransformer extends SetDateComponentTransformer {
    static get presetArguments(): {
        unit: {
            valueSource: string;
            stringInput: string;
        };
    };
    constructor(context?: {});
}
import { SetDateComponentTransformer } from "./SetDateComponent";