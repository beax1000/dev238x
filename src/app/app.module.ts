import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ItemsDataService } from './services/itemsDataService';
import { RandomUtilsService } from './services/randomUtilsService';
import { ShoppingCartService } from './services/shoppingCartService';
import { StringHumanizePipe } from './pipes/string-humanize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingComponent,
    ProductComponent,
    CartComponent,
    ContactComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    StringHumanizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule 
  ],
  providers: [
    ItemsDataService,
    RandomUtilsService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
