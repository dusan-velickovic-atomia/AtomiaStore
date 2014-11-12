﻿var Atomia = Atomia || {};

Atomia.Domains = (function (_, request) {
    'use strict'

    function findDomains(searchTerms, callback) {
        var data = {};

        _.each(searchTerms, function (i, searchTerm) {
            data["SearchTerms[" + i + "]"] = searchTerm;
        });

        request({
            resourceId: "Domains.FindDomains",
            data: data,
            success: function (data) {
                if (callback) {
                    var allValidAttribs = _.all(results, function (r) {
                        return r.hasOwnProperty('DomainName') && r.hasOwnProperty('CurrencyCode') && r.hasOwnProperty('Price');
                    });

                    if (allValidAttribs) {
                        callback(data);
                    }
                    else {
                        throw 'Missing field in results: expected DomainName, CurrencyCode and Price';
                    }
                }
            },
            error: function (data, status) {
                console.log(data.message);
            }
        });
    }

    return {
        findDomains: findDomains
    };

} (_, amplify.request));