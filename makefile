SRC_DIR = .
BUILD_DIR = build

PREFIX = .
DIST_DIR = ${PREFIX}

JS_ENGINE ?= `which node nodejs 2>/dev/null`
COMPILER = ${JS_ENGINE} ${BUILD_DIR}/uglify.js --unsafe

MODULES = ${SRC_DIR}/jquery.validate.tooltips.js

STYLESHEETS = ${SRC_DIR}/jquery.validate.tooltips.css

JQVTOOLTIPS = ${DIST_DIR}/jquery.validate.tooltips.js
JQVTOOLTIPS_MIN = ${DIST_DIR}/jquery.validate.tooltips.min.js

all: core

core: min
	@@echo "Build complete."

min: ${JQVTOOLTIPS_MIN}

${JQVTOOLTIPS_MIN}: ${JQVTOOLTIPS}
	@@if test ! -z ${JS_ENGINE}; then \
		echo "Minifying script" ${JQVTOOLTIPS}; \
		${COMPILER} ${JQVTOOLTIPS} > ${JQVTOOLTIPS_MIN}; \
	else \
		echo "You must have NodeJS installed in order to minify the script."; \
	fi

clean:
	@@echo "Removing minified file:" ${JQVTOOLTIPS_MIN}
	@@rm -f ${JQVTOOLTIPS_MIN}

.PHONY: all core min clean
