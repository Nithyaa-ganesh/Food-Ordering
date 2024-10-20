import { Routes } from '@angular/router';
import { HomeComponent} from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { SignUpPageComponent } from './components/pages/signup-page/signup-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { PaymentPageComponent } from './components/pages/payment/payment.component';
import { OrderconfirmationComponent } from './components/pages/orderconfirmation/orderconfirmation.component';
import { OrderPageComponent } from './components/pages/orders/orders.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  {path:'tag/:tag',component:HomeComponent},
  { path: 'tag/:tagName', component: TagsComponent },
  {path: 'food/:id',component:FoodPageComponent},
  {path: 'cart-page',component:CartPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignUpPageComponent},
  {path: 'checkout', component: CheckoutPageComponent},
  { path: 'payment', component: PaymentPageComponent},
  {path:'orderconfirmation',component:OrderconfirmationComponent},
  {path:'orders',component:OrderPageComponent}

];
