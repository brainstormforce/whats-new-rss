
import { useEffect } from "react";

function useWhatsNewRSS(args) {

	useEffect(() => {

		const id = 'whats-new-rss-library';
		const distPath = !!args?.distPath ? args.distPath : './dist'

		if (!document.getElementById(id + '-js')) {
			const style = document.createElement('link');
			style.setAttribute('id', id + '-css');
			style.setAttribute('rel', 'stylesheet');
			style.setAttribute('href', `${distPath}/whats-new-rss.css`);

			const script = document.createElement('script');
			script.setAttribute('id', id + '-js');
			script.src = `${distPath}/whats-new-rss.js`;

			script.onload = () => {
				return new WhatsNewRSS(args)
			}

			document.querySelector('head')?.appendChild(style);
			document.querySelector('body')?.appendChild(script);
		}

	}, [args])

}

export default useWhatsNewRSS;
