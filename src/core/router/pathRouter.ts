import { CoreRouter } from './coreRouter';

export class PathRouter implements CoreRouter {
	private routes: Record<string, Function> = {};

	private isStarted = false;

	start() {
		if (!this.isStarted) {
			this.isStarted = true;

			window.onpopstate = () => {
				this.onRouteChange.call(this);
			};

			this.onRouteChange();
		}
	}

	private onRouteChange(pathname: string = window.location.pathname) {
		const found = Object.entries(this.routes).some(([routePath, callback]) => {
			if (routePath === pathname) {
				callback();
				return true;
			}
			return false;
		});

		if (!found && this.routes['*']) {
			this.routes['*']();
		}
	}

	use(pathname: string, callback: Function) {
		this.routes[pathname] = callback;
		return this;
	}

	go(pathname: string) {
		window.history.pushState({}, '', pathname);
		this.onRouteChange(pathname);
	}

	back() {
		window.history.back();
	}

	forward() {
		window.history.forward();
	}
}
