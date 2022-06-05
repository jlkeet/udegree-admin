import { OnDestroy, OnInit } from '@angular/core';
import { NbFilterable } from './data-source/tree-grid-data-source';
import * as ɵngcc0 from '@angular/core';
export declare class NbFilterDirective {
    filterable: NbFilterable;
    filter(filterRequest: string): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NbFilterDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NbFilterDirective, "[nbFilter]", never, { "filterable": "nbFilter"; }, {}, never>;
}
/**
 * Helper directive to trigger data source's filter method when user types in input
 */
export declare class NbFilterInputDirective extends NbFilterDirective implements OnInit, OnDestroy {
    private search$;
    private destroy$;
    filterable: NbFilterable;
    /**
     * Debounce time before triggering filter method. Set in milliseconds.
     * Default 200.
     */
    debounceTime: number;
    ngOnInit(): void;
    ngOnDestroy(): void;
    filter(event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NbFilterInputDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NbFilterInputDirective, "[nbFilterInput]", never, { "debounceTime": "debounceTime"; "filterable": "nbFilterInput"; }, {}, never>;
}

//# sourceMappingURL=tree-grid-filter.d.ts.map