/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @classdesc Matches and converts any ISO 639 language tag to BCP-47 language tags
 */
import BaseMatcher from './BaseMatcher';
import DashConstants from '../../constants/DashConstants';
var bcp47Normalize = require('bcp-47-normalize')

class LangMatcher extends BaseMatcher {
    constructor() {
        super(
            (attr, nodeName) => {
                const stringAttrsInElements = {
                    [DashConstants.ADAPTATION_SET]:                 [ DashConstants.LANG ],
                    [DashConstants.REPRESENTATION]:                 [ DashConstants.LANG ],
                    [DashConstants.CONTENT_COMPONENT]:              [ DashConstants.LANG ],
                    [DashConstants.LABEL]:                          [ DashConstants.LANG ],
                    [DashConstants.GROUP_LABEL]:                    [ DashConstants.LANG ]
                    // still missing from 23009-1: Preselection@lang, ProgramInformation@lang
                };
                if (stringAttrsInElements.hasOwnProperty(nodeName)) {
                    let attrNames = stringAttrsInElements[nodeName];
                    if (attrNames !== undefined) {
                        return attrNames.indexOf(attr.name) >= 0;
                    } else {
                        return false;
                    }
                }
                return false;
            },
            str => {
                let lang = bcp47Normalize(str);
                if (lang !== undefined) {
                    return lang;
                }
                return String(str);
            }
        );
    }
}

export default LangMatcher;