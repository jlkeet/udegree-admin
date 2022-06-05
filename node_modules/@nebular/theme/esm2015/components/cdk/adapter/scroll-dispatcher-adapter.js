import { Injectable, NgZone } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { NbPlatform } from '../platform/platform-service';
import { NbLayoutScrollService } from '../../../services/scroll.service';
export class NbScrollDispatcherAdapter extends ScrollDispatcher {
    constructor(ngZone, platform, scrollService) {
        super(ngZone, platform);
        this.scrollService = scrollService;
    }
    scrolled(auditTimeInMs) {
        return this.scrollService.onScroll();
    }
}
NbScrollDispatcherAdapter.decorators = [
    { type: Injectable }
];
NbScrollDispatcherAdapter.ctorParameters = () => [
    { type: NgZone },
    { type: NbPlatform },
    { type: NbLayoutScrollService }
];
//# sourceMappingURL=scroll-dispatcher-adapter.js.map