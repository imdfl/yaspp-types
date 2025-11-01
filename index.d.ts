export namespace YASPP {

	type NavItemLocaleProps = Record<string, string>;

	interface INavItemData {
		id: string;
		type: string;
		title: string;
		url: string;
		locale: NavItemLocaleProps;
		icon?: string;
		target?: string;
	}

	interface INavSectionData {
		id: string;
		locale: NavItemLocaleProps;
		items: ReadonlyArray<string>;
		title: string;
	}

	interface INavGroupData {
		items: ReadonlyArray<string>;
	}


	interface IYasppNavData {
		readonly items: Record<string, Omit<INavItemData, "id">>;
		readonly sections: Record<string, Omit<INavSectionData, "id">>;
		readonly groups: Record<string, INavGroupData>;
	}

	/**
	 * Result of running a process
	 */
	export interface IProcessOutput {
		readonly output: ReadonlyArray<string>;
		readonly errors: ReadonlyArray<string>;
		readonly status: number;
	}
	
	export interface IMutableProcessOptions {
		/**
		 * command name as typed in console
		 */
		exe: string;
		/**
		 * arguments
		 */
		argv: string[];
	
	
		env?: {[key: string]: string };
		/**
		 * Optional working directory
		 */
		cwd?: string;
	
		/**
		 * If true, log the data, if a function call it on every stdin data
		 */
		onData?: ((data: string) => void) | boolean;
	
		/**
		 * If true, log the error, if a function call it on every stderr data
		 */
		onError?: ((data: string) => void) | boolean;
	
		/**
		 * If true, only log the command to console
		 */
		dryrun?: boolean;
		/**
		 * Suppress output
		 */
		quiet?: boolean;
	
		/**
		 * if a function, call periodically, if true, print '.' periodically
		 */
		onProgress?: (() => unknown) | boolean;

		/**
		 * Unless `false`, run the process under a shell
		 */
		shell?: boolean;
	}
	
	export type IProcessOptions = Readonly<IMutableProcessOptions>;


	interface IProjectLocaleConfig {
		readonly langs: ReadonlyArray<string>;
		readonly defaultLocale: string;
		readonly pages: Record<string, ReadonlyArray<string>>;
	}

	interface IYasppBaseConfig {
		/**
		 * Relative to project root, all content is copied to `/public`, e.g. `/public/content`, `/public/locales`
		 */
		readonly root: string;
	}

	export type IYasppLocaleConfig = IProjectLocaleConfig & IYasppBaseConfig;

	interface IYasppContentConfig extends IYasppBaseConfig {
		/**
		 * Mandatory path to index folder relative to the content root folder, e.g. `docs` which is expected to contain
		 * at least a content folder for the default locale, e.g. 'en'
		 */
		readonly index: string;
	}

	interface IYasppNavConfig {
		/**
		 * Path to navigation configuration file, relative to the project root
		 */
		readonly index: string;

	}

	interface IYasppStyleConfig extends IYasppBaseConfig {
		/**
		 * Optional Paths of css files to include in the site's pages.
		 * The Urls are relative to the style root
		 */
		readonly sheets?: string | ReadonlyArray<string>;
		readonly classBindings?: string | ReadonlyArray<string>;
		readonly themes: ReadonlyArray<string>;
		/**
		 * Defaults to `"light"`
		 */
		readonly theme?: string;
	}

	type IYasppAssetsConfig = IYasppBaseConfig;

	/**
	 * Project configuration file
	 */
	interface IYasppConfig {
		/**
		 * Content configuration
		 */
		readonly content: IYasppContentConfig;
		/**
		 * Navigation configuration - 
		 */
		readonly nav: IYasppNavConfig;
		/**
		 * Locales configuration
		 */
		readonly locale: IYasppLocaleConfig;
		readonly style?: IYasppStyleConfig;
		readonly assets?: IYasppAssetsConfig;
	}

}