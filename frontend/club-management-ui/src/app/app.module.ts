import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Import your routing module here
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        // Add other components here
    ],
    imports: [
        BrowserModule,
        AppRoutingModule, // Include your routing module here
        // Add other modules here
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
