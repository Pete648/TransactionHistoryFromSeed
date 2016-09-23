import { NgModule } from '@angular/core';
import { FormsModule }		from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// seed
import { TransactionHistoryComponent } from './transaction-history.component';
import { routes } from './app.routes';
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';

// transaction history
import { JhaDateStringPipe, JhaMoneyPipe } from './jha.pipe';
import { EpisysServerService } from './episys-server.service';
import { MockEpisysServerService } from './mock-episys-server.service';


@NgModule({
	imports:
	[
		FormsModule,
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(routes),
		AboutModule,
		HomeModule,
		SharedModule.forRoot()
		
	],
	declarations: [
		TransactionHistoryComponent,
		JhaDateStringPipe,
		JhaMoneyPipe
	],
	providers: [
		{
			provide: APP_BASE_HREF,
			useValue: '<%= APP_BASE %>'
		},
		MockEpisysServerService,        // accessible anywhere in application
		EpisysServerService        // accessible anywhere in application
	],
	bootstrap: [
		TransactionHistoryComponent
	]

})

export class AppModule { }
