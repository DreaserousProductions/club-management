import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        // other components 
    ],
    imports: [
        BrowserModule,
        // other modules 
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { } 