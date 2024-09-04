import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Import routing module
import { NavPanelComponent } from './nav-panel/nav-panel.component';

@NgModule({
    declarations: [
        AppComponent, // Declare the component here
        NavPanelComponent
        // Other components
    ],
    imports: [
        BrowserModule,
        AppRoutingModule // Include routing module
        // Other modules
    ],
    providers: [],
    bootstrap: [AppComponent] // Bootstrap the component here
})
export class AppModule { }