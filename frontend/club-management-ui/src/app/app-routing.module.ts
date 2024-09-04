import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppModule } from './app.module';
// import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';

const routes: Routes = [
    { path: '', component: AppModule },
    // { path: 'about', component: AboutComponent },
    // other routes 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { } 