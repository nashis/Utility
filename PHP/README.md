# utils.php

### Description

Few utility functions to help work with PHP better

### Features

* getHTMLTagsAttributes - parses a string or file of HTML content and returns tags and values
* getValueSafelyArr - returns a value for a given key (including nested ones) from an array

### Usage

* getHTMLTagsAttributes - Used for parsing markup obtained from API calls to remove inline styling and all
* getValueSafelyArr - Ensures PHP code is not broke because we are trying to assess some none existing array member