

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
	
	/**
	 * Represents the full data of a single section in a navigation list
	 */
	interface INavSection {
		id: string;
		locale: Record<string, string>;
		items: ReadonlyArray<INavItemData>;
		title: string;
	}
	
	interface IYasppNavData {
		readonly items: Record<string, Omit<INavItemData, "id">>;
		readonly sections: Record<string, Omit<INavSectionData, "id">>;
		readonly groups: Record<string, INavGroupData>;
	}
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
		 * Path to navigation configuration file
		 */
		readonly index: string;

	}

	interface IYasppStyleConfig extends IYasppBaseConfig {
		/**
		 * Optional Path to main css file, relative to the style root , defaults to site.scss (generated if no css is provided by the user)
		 */
		readonly index?: string;
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
		readonly nav: IYasppNavConfig;
		/**
		 * Locales configuration
		 */
		readonly locale: IYasppLocaleConfig;
		readonly style?: IYasppStyleConfig;
		readonly assets?: IYasppStyleConfig;
	}

	interface IYasppAppConfig extends IYasppConfig {
		/**
		 * Relative to yaspp root
		 */
		readonly root: string;
	}

}