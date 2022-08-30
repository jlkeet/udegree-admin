import {
  OnChanges,
  SimpleChange,
  Component,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { UserPlansComponent } from "../plans/user-plans/user-plans.component";
import { PlansService } from "app/@core/data/plans.service";
import { AuthService } from "app/auth/auth-service.service";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "notification-icon",
  styles: [
    `
      .notification-icon img {
        height: 24px;
        width: 24px;
        cursor: pointer;
      }

      .notification-icon-badge-container {
        position: absolute;
        top: 363px;
        left: 80px;
      }

      .notification-icon-badge-container:hover {
        position: absolute;
        top: 363px;
        left: 80px;
      }

      .notification-icon-badge {
        border-radius: 100%;
        padding: 2px 6px;
        background: red;
        border: 1px solid red;
        color: #fff;
        text-align: center;
        font-size: 12px;
      }

      .imgWrap {
        display: inline-block;
      }

      .imgWrap:hover {
        background-color: #e6eaed;
      }
    `,
  ],
  template: ` <div class="notification-icon">
    <span class="notification-icon-badge-container">
      <span *ngIf="messageCount > 0" class="notification-icon-badge">{{
        filteredCount
      }}</span>
    </span>
  </div>`,
})
export class NotificationIconComponent {
  public messageCount: number = 0;
  public filteredCount: number = 0
  public adminAccess;
  public plans;

  constructor(
    public userPlans: UserPlansComponent,
    public plansService: PlansService,
    public authService: AuthService,
    public db: AngularFirestore
  ) {}

  ngOnInit() {
    this.plansService.getCount();

    setTimeout(() => {
      this.getAdminListFilter();
      this.plans = this.plansService.pendingPlans;
    }, 1000);

    setTimeout(() => {
      this.messageCount = this.plansService.pendingPlans.length;

      this.adminAccess.then((admin) => {
        for (let i = 0; i < this.messageCount; i++) {
          this.db
            .collection("users")
            .doc(this.plansService.pendingPlans[i].email)
            .collection("degree")
            .doc("faculty")
            .get()
            .toPromise()
            .then((result) => {
              if (result.data() !== undefined) {
                if (admin.faculties[0] === result.data().name) {
                    this.filteredCount++;
                }
              }

              // console.log(result.data().name)
            });
        }
      });

      //   console.log(this.plansService.pendingPlans.length);
    }, 4000);
  }

  public getAdminListFilter() {
    this.adminAccess = this.authService.getAdminRole(
      this.authService.userDetails.email
    );
  }
}
