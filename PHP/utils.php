<?php

namespace PhpUtils;

class Utils {
    /*
     * @desc:   parses file or string containing HTML and retrieves tags and attributes specified
     * @params:
     *      $src            : array specifying source type {string or file} and value
     *      $tags           : array specifying the list of tags to search for
     *      $attributes    : array specifying the list of arguments to query for
     * @return: associative array specifying associated tag and attribute array value
     */

    public static function getHTMLTagsAttributes($src, $tags, $attributes) {
        $retVal = array();
        if (!isset($src) || !isset($tags) || !isset($attributes)) {
            error_log('Invalid arguments passed ' . __METHOD__);
            return $retVal;
        }

        try {
            $dom = new \DOMDocument();
            switch (strtolower($src['type'])) {
                case 'string':
                    $dom->loadHTML($src['value']);
                    break;
                case 'file':
                    $dom->loadHTMLFile($src['value']);
                    break;
                default :
                    error_log('Source type handler missing for: ' . $src['type']);
                    break;
            }

            foreach ($tags as $tag) {
                $elemTags[$tag] = $dom->getElementsByTagName($tag);
            }

            foreach ($elemTags as $tag => $nodes) {
                foreach ($nodes as $node) {
                    foreach ($attributes as $attribute) {
                        $retVal[$tag][$attribute][] = $node->getAttribute($attribute);
                    }
                }
            }
        } catch (\Exception $e) {
            error_log('Exception: ' . $e->getMessage() . ' in Method: ' . __METHOD__);
        }

        return $retVal;
    }

    /*
     *  getValueSafelyArr
     *  @desc: get value of a given key from an array by traversing the given path
     *
     *  @params:
     *      $array: associative array to fetch value from
     *      $keys: comma separated(unless other wise specified by 4th parameter) string indicating path to follow in
     *              the array. eg: 'response,id', 'response,docs,2,json_dump'
     *      $default: default value to return if the key specified is not found, defaults to ''
     *      $splitter: character to use for traversing the array, defaults to ','
     *
     * @return: object/string/null value of the given key.
     *
     * */

    public static function getValueSafelyArr($array, $keys, $default = '',
            $splitter = ',') {
        if (!is_array($array) || empty($array)) {
            return $default;
        }

        if (!is_array($keys)) {
            $keys = array_values(explode($splitter, $keys));
        }

        $refArray = $array;
        foreach ($keys as $key) {
            if (isset($refArray[$key]))
                $refArray = $refArray[$key];
            else
                return $default;
        }

        if (empty($refArray))
            return $default;
        else
            return $refArray;
    }

}
