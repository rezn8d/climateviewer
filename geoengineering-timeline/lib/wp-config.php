<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('WP_CACHE', true); //Added by WP-Cache Manager

define('DB_NAME', 'sscpwn3r_wcz31');

/** MySQL database username */
define('DB_USER', 'sscpwn3r_wcz31');

/** MySQL database password */
define('DB_PASSWORD', 'S&C~#4MM0h21*(1');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'NH5g9Ma2WJPQ8QFLitiAzKlza77sb1ssu6BZRCM2qNWtooDpfrn6akIS1qboEFa2');
define('SECURE_AUTH_KEY',  'u0afdEQKByGK4PoXN4wHmiCyismw9dZxMLa6bMfElogxbpTciuUqmQLOeAFgQfPP');
define('LOGGED_IN_KEY',    '5T0BhDWgbeZvKNdzLd1ZZ29XHIlYGy0vGCUtVhvfIECPzkY1IsZXolJVpnvRYTtK');
define('NONCE_KEY',        'EJxcCjYh7g5W3sG9GovSXzvnGHwbrbnMYRKXmF2lcJ099aT3ztBOXFmmnx7SS8KH');
define('AUTH_SALT',        'LHDVfio5NtcmqiYOZ4ViQIGNdTjIhw94mEB7OIl71Gtljbdr1NaTAlM55ccePAzy');
define('SECURE_AUTH_SALT', '3Xjv9JqeanRRv3eE8jAJRdaAmivOfus1qcAnVO15M7iUoEWKDIvbyktJ0oDfxVZw');
define('LOGGED_IN_SALT',   'F0kTgKSjOMEYDDFpFDnRktleZrf79CPQgcnXaFyTVYwqsVng01micycOgVpFsDk7');
define('NONCE_SALT',       'TR4vwjLwZ5qYrglagpGkiRvxTDtkPftRyrQI6kFUvRBgKd2FpIJDABN0LsykN5e2');

/**
 * Other customizations.
 */
define('WP_HOME','http://climateviewer.com');
define('WP_SITEURL','http://climateviewer.com');

define('FS_METHOD','direct');define('FS_CHMOD_DIR',0755);define('FS_CHMOD_FILE',0644);
//define('WP_TEMP_DIR',dirname(__FILE__).'/wp-content/uploads');
define( 'WP_TEMP_DIR', ABSPATH . 'wp-content/') ;
/**
 * Turn off automatic updates since these are managed upstream.
 */
define('AUTOMATIC_UPDATER_DISABLED', true);


/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wcz3_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
