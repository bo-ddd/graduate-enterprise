<template>
    <div class="enterprise-registra">
        <div class="wrap container">
            <div class="title-wrap">
                <h2>企业信息填写</h2>
            </div>
            <el-form :model="form" label-width="120px">
                <div class="form">
                    <h3>基本信息</h3>
                    <!-- 企业全称 -->
                    <el-form-item label="企业全称">
                        <el-input class="el-input_560-40" placeholder="需与营业执照一致" v-model="form.companyFullName" />
                    </el-form-item>

                    <!-- 品牌全称 -->
                    <el-form-item label="品牌名称">
                        <el-input class="brand-name" placeholder="品牌名称或企业简称,一般不超过6个字" v-model="form.companyName" />
                    </el-form-item>

                    <!-- 企业logo -->
                    <el-form-item label="企业logo">
                        <el-upload action="#" list-type="picture-card" :auto-upload="false">
                            <el-icon class="uplpoad-icon flex-column-center">
                                <div>
                                    <Plus />
                                </div>
                                <div class="fs-13">上传图片</div>
                            </el-icon>

                            <template #file="{ file }">
                                <div>
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview"
                                            @click="handlePictureCardPreview(file)">
                                            <el-icon>
                                                <zoom-in />
                                            </el-icon>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                            @click="handleDownload(file)">
                                            <el-icon>
                                                <Download />
                                            </el-icon>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                            @click="handleRemove(file)">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                        </span>
                                    </span>
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>

                    <!-- 企业注册地区 -->
                    <el-form-item label="企业注册地区">
                        <el-cascader placeholder="请输入" class="el-input_240" :options="RegisteredArea" clearable />
                    </el-form-item>

                    <!-- 详细注册地址 -->
                    <el-form-item label="详细注册地址">
                        <el-input placeholder="详细注册地址" class="el-input_560-40" v-model="form.companyAddr" />
                    </el-form-item>

                    <!-- 禁用状态的选择器 disabled -->
                    <el-form-item label="所属行业">
                        <el-cascader class="el-input_240" placeholder="请选择" v-model="forbidden" :options="forbiddenData"
                            @change="handleChange">
                            <template #value>
                                <span>{{ forbiddenData[0] }}</span>
                            </template>
                        </el-cascader>
                    </el-form-item>


                    <!-- 正常状态的选择器 -->
                    <el-form-item label="企业性质">
                        <el-select v-model="enterpriseNatureVal" placeholder="请选择" size="large">
                            <el-option v-for="item in enterpriseNature" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="企业规模">
                        <el-select v-model="enterpriseScaleVal" placeholder="请选择" size="large">
                            <el-option v-for="item in enterpriseScale" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="企业标签">
                        <el-select v-model="enterpriseLabelVal" placeholder="请选择" size="large">
                            <el-option v-for="item in enterpriseLabel" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                </div>

                <div class="form">
                    <h3>认证信息</h3>
                    <!-- 社会信用代码 -->
                    <el-form-item label="社会信用代码">
                        <el-input placeholder="社会信用代码" class="input_280-40" v-model="form.companySocialCreditCode" />
                    </el-form-item>

                    <!-- 营业执照 -->
                    <div class="align-center">
                        <el-form-item label="营业执照"></el-form-item>
                        <div>
                            <el-upload action="#" list-type="picture-card" :auto-upload="false">
                                <el-icon class="uplpoad-icon flex-column-center">
                                    <div>
                                        <Plus />
                                    </div>
                                    <div class="fs-13">上传图片</div>
                                </el-icon>

                                <template #file="{ file }">
                                    <div @click="add(file)">
                                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                        <span class="el-upload-list__item-actions">
                                            <span class="el-upload-list__item-preview"
                                                @click="handlePictureCardPreview(file)">
                                                <el-icon>
                                                    <zoom-in />
                                                </el-icon>
                                            </span>
                                            <span v-if="!disabled" class="el-upload-list__item-delete"
                                                @change="handleDownload(file)">
                                                <el-icon>
                                                    <Download />
                                                </el-icon>
                                            </span>
                                            <span v-if="!disabled" class="el-upload-list__item-delete"
                                                @click="handleRemove(file)">
                                                <el-icon>
                                                    <Delete />
                                                </el-icon>
                                            </span>
                                        </span>
                                    </div>
                                </template>
                            </el-upload>
                            <div class="business-license_test mt-10">
                                <p>
                                    请上传清晰的营业执照, 执照中的<b>社会信用代码、企业名称</b>需与上方填写的一致。
                                </p>
                                <p>图片大小不可超过<b>2M</b>, 格式为jpg,jpeg或png</p>
                            </div>
                        </div>
                    </div>

                    <div class="horizontal-line"></div>

                    <div>
                        <h3>联系信息</h3>
                        <!-- 联系人 -->
                        <el-form-item label="联系人">
                            <el-input placeholder="填写联系人" class="input_280-40" v-model="form.companyContactName" />
                        </el-form-item>

                        <!-- 联系方式 -->
                        <el-form-item label="联系方式">
                            <el-input placeholder="填写联系方式" class="input_280-40" v-model="form.companyContactPhone" />
                        </el-form-item>

                        <!-- 接受简历邮箱 -->
                        <el-form-item label="接受简历邮箱">
                            <el-input placeholder="填写接受简历邮箱" class="input_280-40" v-model="form.companyContactEmail" />
                        </el-form-item>
                    </div>
                </div>

                <div class="form footer">
                    <h3>企业简介</h3>

                    <!-- 企业简介 -->
                    <div class="align-center mb-24">
                        <el-form-item label="企业简介"></el-form-item>
                        <el-input class="textarea_560-184" v-model="form.companyIntroducation" type="textarea" />
                    </div>

                    <!-- 企业官网 -->
                    <el-form-item label="企业官网">
                        <el-input placeholder="非必填" class="input_280-40" v-model="form.companyWebUrl" />
                    </el-form-item>

                    <div class="horizontal-line"></div>

                    <div class="school-of-intention">
                        <div class="flex">
                            <h3>意向学校</h3>
                            <p class="ml-16 intention-description">企业的招聘信息在所选学校会优先展示</p>
                        </div>

                        <div class="align-center">
                            <el-form-item label="学校">
                                <el-select size="large" class="school-input" v-model="schoolListVal" multiple
                                    placeholder="请输入">
                                    <el-option v-for="item in schoolList" :key="item.sortId" :label="item.schoolName"
                                        :value="item.schoolId" />
                                </el-select>
                            </el-form-item>
                        </div>
                        <div></div>
                    </div>
                </div>

                <div>
                    <!-- 提交 -->
                    <el-form-item>
                        <el-button class="submit-button" type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>

        </div>
        <footer-bar></footer-bar>
    </div>
    <!-- 用户协议 弹窗 -->
    <div class="dialogs">
        <el-dialog class="el-dialog_one" v-model="centerDialogVisible" :align-center="true" :show-close="false"
            width="30%">
            <template #header class="title-center">
                用户服务协议
            </template>
            <div class="dialog__body">
                <div>
                    欢迎您注册由北京万德宏远教育科技有限公司提供技术支持的招聘企业账号并使用相关的服务。榕树云为该招聘系统的品牌名称。
                </div>
                <div>
                    本《用户服务协议》是您与榕树云之间就注册榕树云企业账号及使用榕树云各项服务等相关事宜订立的协议。当您阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与榕树云达成一致，成为榕树云的用户。
                </div>
                <div>
                    如您不同意本用户协议，请点击“我不同意”，请勿使用榕树云的服务。如您对本用户协议的内容（特别是涉及免除或者责任限制的条款）有任何疑惑或不满意，可随时按照本用户协议中列明的联系方式与我们联系，我们将及时处理您的请求或投诉，并针对您的需求进行解释
                </div>
                <div>
                    联系方式：13810317852 邱老师
                </div>
                <h3>一、 用户协议的主体和范围</h3>
                <h4>1. 协议主体</h4>
                <div>
                    与您签订本用户协议的主体视您所使用的具体服务而定。“榕树云”是北京万德宏远教育科技有限公司旗下运营或向您提供具体服务的相关主体的统称。“用户”是指使用”榕树云”服务进行招聘的企业及其负责人，在本用户协议中也称呼为“您”。
                </div>
                <h4>2. 服务</h4>
                <div>
                    本用户协议适用于本协议项下提供的”榕树云”网页
                </div>
                <div>(www.rongshuyun.com)</div>
                <h4>3. 协议内容</h4>
                <div>
                    本协议是”榕树云”与您之间的主服务协议，由于”榕树云”向您提供多种服务，如您选择使用相关服务，以下协议可能构成您与”榕树云”之间的补充协议，补充协议与本协议不可分割且具有同等法律效力。您理解并同意，我们可能会不时修改以下各项协议/规则/政策。若有重大变更，我们将通过网页或推送通知等有效方式发布或发送关于条款更改的公告，使您有机会在更改生效之前查看更改。如您不同意任何更改的内容，可停止更改内容所涉及的服务或通过联系客服以注销账号。如您在上述更改内容实施后继续使用所涉及的服务，将视为您已同意各项更新修改内容。
                </div>
                <h3>二、 企业账号注册与使用</h3>
                <h4>1. 注册资料</h4>
                <div>
                    为了证明企业用户主体资格的真实性，您应当向我们提供相关证明材料（包括但不限于加盖公章的营业执照副本等），您同意向我们不可撤销地承诺您所属的企业系依法成立的法人、团体或其他法律认可的组织。您应当秉持诚实信用、合法善意的原则，向”榕树云”提供合法、真实和准确的注册资料，不应提交任何违法或不良信息，相关资料如有变动，您应及时更新。您了解并同意，您有义务保持您提供信息的真实性及有效性，以便我们或其他用户与您联系
                </div>
                <h4>2. 服务资格</h4>
                <div>
                    您应当承诺您已经获得了相应的服务资格，即您具备相应的民事行为能力签订本用户协议并且已经达到”榕树云”对“最低年龄”的要求。在注册成为企业用户的同时，您也承认了您拥有购买我们提供的服务产品所必须的完全民事权利能力和民事行为能力，及您已获得企业用户的充分授权有权代表企业用户使用”榕树云”企业账号，并受本协议的约束。
                </div>
                <h4>3. 账号使用</h4>
                <div>
                    您需对您企业名下的账号承担管理责任，您企业名下的账号操作行为均视为企业行为，由企业承担相应的法律责任。如有证据证明或”榕树云”有理由相信您存在不当注册或不当使用”榕树云”企业账号的情形，我们可能对相关账号进行管理、关闭或采取其他合理措施，如因您的不当注册或不当使用给”榕树云”及相关方造成损失的，您还应承担相应的赔偿责任。
                </div>
                <h4>4. 账号安全规范</h4>
                <div>
                    您应选择保密性强且安全性高的密码，妥善管理您的用户名、登录密码、支付密码（如有）和验证码。除”榕树云”存在过错外，您应对您账户项下的所有行为结果（包括但不限于发布招聘信息、购买商品及服务及披露信息等）负责。请不要轻信索要密码或财产的网络信息，不要将上述信息提供给任何第三方使用，不从事任何可能使用户名、
                    密码存在泄露危险的行为。建议您尽量不要在第三方应用中使用与”榕树云”企业帐户相同的密码。如您未妥善保管您的企业账号密码，而导致任何损失或损害，您应通过司法、行政等救济途径向侵权行为人追偿或由您自行承担。
                    您理解并同意，通过自研、授权代理、默认其他任何第三方登录其账号或其他任何方式对”榕树云”网站、手机App及简历资源、数据库信息等进行任何非正常访问或对上述资料进行获取、下载等，均属于不合理使用账号的行为。当您发现企业账号的不当使用或有任何其他可能危及账号安全的情形时，应立即联系我们。您理解”榕树云”对您的任何请求采取行动均需要合理时间，且”榕树云”应您请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大，除”榕树云”存在法定过错外，”榕树云”不承担责任。
                </div>
                <h3>三、 “榕树云”服务及规范</h3>
                <h4>1. 服务概况</h4>
                <div>
                    作为人才生态的构建者，”榕树云”致力于建立更受职场人喜爱的职场发展平台和更受企业信赖的人才平台。”榕树云”向用户提供的服务，包括但不限于网络招聘、校园招聘、海外招聘、人才发展、人才测评、服务外包、职场社区、广告等产品及服务，为企业和职场人提供一站式的人才招聘服务，提高职场竞争力并实现自我价值。
                    我们的服务可能会根据您的需求不时调整更新，请以我们网页或相关移动客户端的服务项目为准。
                </div>
                <h4>2. 您使用招聘服务前的准备</h4>
                <div>
                    由于我们通过国际互联网络为您提供网络服务，在您使用招聘服务前，需要满足使用网络服务的条件，您应当自行准备以下事项： 1) 配备上网的所需设备，包括个人电脑、调制解调器或其他必备上网装置； 2)
                    负担上网所支付的与此服务有关的电话费用、网络费用。
                </div>
                <h4>3. 发布招聘信息</h4>
                <div>
                    您在成功注册为企业用户后，即可就招聘目的（即雇主寻找雇员）在本网站发布招聘信息，以及按照相关要求和权限，发布与招聘目的有关的信息。您理解并同意，在发布招聘信息时不应存在以下行为：
                    <ul>
                        <li>
                            1) 发布任何违反法律法规及其他规范性文件的信息，包括但不限于属于任何非法的、骚扰性的、中伤性的、辱骂性的、恐吓性的、伤害性、庸俗、淫秽、有违社会公序良俗等的信息或言论；
                        </li>
                        <li>
                            2) 发布任何与求职无关或与招聘信息发布之目的不符合的意见、通知、商业广告等信息；
                        </li>
                        <li>
                            3) 发布虚假、不准确、不完整或具有误导性的职位信息等内容；
                        </li>
                        <li>
                            4) 发布任何与职位名称、职位描述不符合的信息；
                        </li>
                        <li>
                            5) 以任何形式侵犯他人的版权、商标权、商业秘密或其他知识产权；
                        </li>
                        <li>
                            6) 侵犯个人和社会大众的隐私安全；
                        </li>
                        <li>
                            7) 利用网站开设的功能或权限发布、编辑、传播违反法律法规及其他规范性文件、引人反感或有违风化的信息、言论或内容。
                        </li>
                    </ul>
                    您理解并同意，您了解”榕树云”上的信息系用户自行发布，且可能存在风险和瑕疵。我们将通过依法建立相关检查监控制度尽可能保障您的合法权益及良好体验。同时，鉴于服务中的海量信息以及网络环境的虚拟性，我们无法逐一审查信息的合法性、真实性和准确性，您公开发布的信息可能被任何其他访问者浏览，也可能被错误使用，对此您应谨慎判断。
                </div>
                <h4>4. 查阅简历</h4>
                <div>
                    您有权在网站或相关移动客户端中搜索求职者的简历或猎头顾问的简介，从而发现您感兴趣的求职者或猎头顾问，并进一步沟通与了解。您应当按照法定或约定的目的或方式使用上述信息，您在查阅简历时不应存在以下行为：
                    <ul>
                        <li>
                            1) 将任何服务中的信息用作任何商业目的，以及未经我们的同意，向任何其他第三方披露、许可、转让非公开信息或以类似方式使第三方知晓相关信息；
                        </li>
                        <li>
                            2) 未经我们的同意，将从平台上获得的服务产品（包括但不限于简历信息）用于任何除自身招聘以外的其他目的，或以任何方式泄露、授权或变相授权给任何第三方；
                        </li>
                        <li>
                            3) 擅自打印、复制或以其他方式使用有关雇员的任何个人资料；
                        </li>
                        <li>
                            4) 利用相关信息，与猎头顾问串通完成推荐；
                        </li>
                        <li>
                            5) 将我们提供的信息用于招聘以外的其他不合理目的。
                        </li>
                    </ul>
                </div>
                <h4>5. 完成招聘目的后</h4>
                <div>
                    在招聘服务结束后，您应将从平台上获取的服务产品（包括但不限于简历信息）进行销毁，并且不得将上述内容用于除自身招聘以外的其他目的，或以任何方式泄露、授权或变相授权给任何第三方。
                </div>
                <h4>6. 信息的更改与删除</h4>
                <div>
                    招聘信息与简历的公布均属于信息的发布行为，除了信息的发布者外，任何访问者不得更改或删除他人发布的任何信息。为保证网络安全秩序，我们可能会依据法律法规及其他规范性文件的要求更改或删除任何不适当的信息。
                </div>
                <h4>7. 招聘活动的开展</h4>
                <div>
                    当您确认您感兴趣的求职者时，您可以进一步开展招聘活动，通过与求职者的沟通、语音通话、笔试和面试等，确认符合您职位需求的求职者名单。您应当实施真实、合法、有效的招聘活动，并避免出现任何违法或不恰当行为，包括但不限于：
                    <ul>
                        <li>1) 未经同意，向公布信息的求职者发电子邮件、打电话、寄信或以其他方式进行接触；</li>
                        <li>2) 冒充他人、利用他人的名义实施招聘活动；</li>
                        <li>3) 存在任何扣押被录用人员或参加面试人员的居民身份证和其他证件，或以担保或其他任何名义向劳动者收取财物，或其他以招用人员为名牟取不正当利益等违法、犯罪行为；</li>
                        <li>4) 不遵守招聘活动秩序，不合理使用”榕树云”提供的物料及资源。</li>
                    </ul>
                </div>
                <h4>8. 支付服务</h4>
                <div>
                    当您购买我们的任何付费服务前，请您仔细阅读付费服务涉及到的特殊条款，涉及到第三方服务提供商提供的服务时，您需要参阅第三方服务提供商的用户协议及产品规则。此外，您理解并同意：
                    <ul>
                        <li>1) 您购买服务产品的价格以您在线下单时网站上公布的价格为准。由于服务产品的特殊性，在前述费用支付完成后，您将不能退款，请您确认无误后再支付；</li>
                        <li>2) 我们将根据不同的服务种类设定相应的价格，我们可能根据市场环境对服务的价格进行调整。您已经购买的服务或产品，不得以变更后的价格（如有）主张索赔或返还一定的金额；</li>
                        <li>3) 我们为您提供了多样的购买方式。您也可以选择使用微信支付、支付宝等方式购买，具体信息以产品页面为准；</li>
                        <li>4) 即便在您的支付方式过期之后，我们仍可储存和继续使用其信息，以避免产生无效交易。</li>
                        <li>5)
                            如您有违反有关法律法规以及本协议的行为，包括但不限于发布有关法律法规或本协议中明令禁止发布的信息，恶意损毁本网站声誉、商誉以及其他违反有关法律法规、本协议以及相关网站、App、微信小程序使用规则的行为，”榕树云”有权单方决定中断或终止向您提供服务，”榕树云”将不退还已支付费用且不承担任何责任，由此给您带来的损失由您自行承担。
                        </li>
                    </ul>
                </div>
                <h4>9. 信息推送</h4>
                <div>
                    您理解并同意，为向您提供更全面、更便利的招聘服务，”榕树云”及其关联公司可能通过语音电话、短信、电子邮件等方式向您推送您可能感兴趣的商品服务的宣传信息、优惠促销等信息（包括商业信息或非商业信息）。此外，为了使您在招聘过程中能实时了解招聘进展，我们可能向您推送消息。如果您不想接受我们以任何方式向您推送的信息，您可以选择收回您的授权同意。您可以通过我们在电子邮件中的退订按钮或按照我们在短信中提供的退订说明进行退订。需要说明的是，当涉及到系统管理或安全信息等事关您使用服务或信息安全的重要事项时，我们仍会向您推送该信息，以确保您能够顺畅使用”榕树云”相关服务。
                    <div>您理解并同意，对上述的相关信息推送，您应审慎判断其真实性和可靠性，除法律法规明确规定外，您应对因该信息而实施的行为负责。</div>
                </div>
                <h4>10. 安全义务</h4>
                <div>
                    在您使用”榕树云”服务的过程中，我们将采取技术措施和其他必要措施尽力保证网络安全、稳定运行，并防范网络违法犯罪活动。同时，您应遵守相关法律法规，不应从事违反法律法规或影响网站安全的行为，包括但不限于：
                    <ul>
                        <li>
                            1)
                            违反网络安全规定和危害计算机信息网络安全的活动：如破坏或企图破坏”榕树云”的网络安全保护措施，对网络服务及相关软硬件设施进行破解、破坏、删除、修改或者增加的；对计算机信息网络中存储或者传输的数据和应用程序进行删除、修改或者增加的，包括通过超载、“邮件炸弹”或“摧毁”等手段，干涉对用户及网络的服务；使用软件或硬件等方式窃取他人口令、非法入侵他人计算机系统，包括接触未经许可的数据或进入未经许可的服务器、帐户、邮箱或许可第三方接入未经本网站同意的由本网站发布、输送、传播的数据、简历或其他信息等；故意制作、传播计算机病毒等破坏性程序的；其他危害计算机信息网络安全的活动；
                        </li>
                        <li>
                            2)
                            使用”榕树云”服务危害国家安全、破坏政治稳定、泄露国家秘密，侵犯国家、社会、集体利益和第三方的合法权益、从事违法犯罪活动；设立用于实施诈骗、传授犯罪方法、制作或者销售违禁物品、管制物品等违法犯罪活动的网站、通讯群组；
                        </li>
                        <li>
                            3)
                            发布禁止性信息：违反国家法律法规禁止性规定的；政治宣传、封建迷信、淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；煽动民族仇恨、民族歧视，破坏民族团结的；欺诈、虚假、不准确或存在误导性的；侵犯他人知识产权或涉及第三方商业秘密及其他专有权利的；侮辱、诽谤、恐吓、涉及他人隐私等侵害他人合法权益的；违背当地风俗习惯的；其他违背社会公共利益或公共道德或依据相关”榕树云”相关协议/规则/政策的规定不适合在”榕树云”中发布的；
                        </li>
                        <li>4) 私自发送促销、产品广告及服务的信息；</li>
                        <li>5) 侵犯他人的版权、商业机密、或其他知识产权，或侵犯他人的隐私权或其他个人合法权利的行为。</li>
                    </ul>
                </div>
                <h3>四、责任承担</h3>
                <div>
                    <div>
                        如您在使用”榕树云”服务的过程中涉及上述行为的一项或多项，则需要对自己的行为承担法律责任。我们可能会向您发送一份书面警告，如果您同意以书面形式承诺不会再次发生上述行为，”榕树云”有权决定是否给予暂停使用或终止使用的处理。在必要或紧急的情形下，我们可能马上暂停或终止对您的服务。
                    </div>
                    <div>
                        如果我们确定您再次发生上述行为，我们将不会发出通知或警告，而直接对您采取暂停使用或终止使用的处理。此外，如果您的行为导致”榕树云”产生支出，例如”榕树云”首先承担了因您的行为导致的行政处罚或侵权损害赔偿责任等损失后，您应立即给予”榕树云”等额的赔偿以使得”榕树云”免受损害。
                    </div>
                    <div>
                        对于因您使用”榕树云”服务或违反本用户协议而导致的或与之相关的任何索赔、起诉或诉讼，包括因索赔、损失、损害赔偿、起诉、判决、诉讼费和律师费而产生的任何责任或费用，您应对”榕树云”及其关联公司、管理人员、代理机构和员工进行赔偿并使之免受损害。
                    </div>
                </div>
                <h3>五、知识产权</h3>
                <div>
                    <div>
                        “榕树云”服务中提供的内容、图表、版式设计等所呈现出的全部或部分可单独作为作品保护的内容（包括但不限于网页、文字、图片、图像、地图、图标、音频、视频、图表、版面设计、电子文档、数据资料等），以及开发、运营和维护本网站运营的各种源代码、执行程序、系统和数据均受到中国版权法律、法规及相关国际条约的保护。除另有书面声明以外，以上信息和内容的知识产权归”榕树云”所有，未经”榕树云”事先书面同意，不允许全部或部分复制、转载、使用、修改、链接、汇编、发表、抓取或以其他任何方式使用。
                    </div>
                    <div>
                        您理解且同意，在事先得到”榕树云”的书面许可，且未对内容和图表等作品、元素或信息进行任何修改的情况下，”榕树云”的相关内容和信息可在”榕树云”页面之外展示或用作非商业用途。经”榕树云”同意后复制、转载或者以其他形式使用本网站相关内容和信息的，应当标明资料来源于“榕树云”或“biyeshen.cn”或
                        “applyoffer.com”，以及”榕树云”或关联方拥有该等内容和信息的著作权的字样。申请使用”榕树云”的相关内容和信息的许可是按逐个批准的原则进行的。欢迎您通过页面底部的联系方式向我们提出申请。
                    </div>
                    <div>
                        请您注意，您在使用”榕树云”服务时上传、提交、存储或发布的内容（包括但不限于文字、图片、视频、音频、动画等）均由您原创或已获合法授权。您通过”榕树云”服务上传、提交、存储或发布的任何内容的知识产权归属您或原始著作权人所有，您的上传、提交、存储或发布行为不会侵犯他人的知识产权或其他合法权益。一旦接受本用户协议，即表明您主动将上述内容的非专属、可转让的财产性权利，如著作权（包括但不限于：复制权、发行权、出租权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），排他地、无地域限制地、免费地授权给”榕树云”及其关联公司。”榕树云”及其关联公司或其所授权许可的第三方可通过对上述授权内容进行修改、复制、改编、翻译、汇编或制作，形成衍生产品。在不违反相关法律法规的强制性规定、尊重相关原始授权内容的知识产权的基础上，该等衍生产品的相关知识产权归”榕树云”及其关联公司或”榕树云”所授权许可的第三方所有。
                    </div>
                    <div>
                        请您注意，”榕树云”及关联品牌的附属标志及图案属于”榕树云”所有。”榕树云”中的业务合作者的商标属于合作者所有。请您不要以自己名义或促使第三方，也不会同意或放任任何第三方，以任何方式申请与”榕树云”商标相似的商标、域名、无线网站、互联网搜索词或任何商号、服务标志。未经”榕树云”或”榕树云”业务合作者的事先书面许可，不得复制或以任何其他方式使用上述商标。
                    </div>
                    <div>
                        请您注意，因您通过”榕树云”上传、发布的任何内容导致的知识产权侵权问题，您将承担全部责任；如”榕树云”及关联公司，或授权的其他服务提供方因第三方知识产权维权而产生损失，您将面临等额赔偿的责任。您同意授权”榕树云”及其关联公司以自己的名义或委托专业第三方针对有关您上传、提交、存储或发布的内容（含衍生作品）的侵权行为进行独立自主的维权并获得全部赔偿。
                    </div>
                </div>
                <h3>六、不可抗力及其他免责事由</h3>
                <h4>1. 不可抗力</h4>
                <div>
                    您理解且同意，当您使用”榕树云”服务时，可能会遇到不可抗力等风险因素，导致”榕树云”服务暂停或无法继续提供。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于台风、地震、洪水、冰雹、政府行为、罢工、骚乱、信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、法律法规变动、司法行政机关的命令、其他不可抗力或第三方的不作为而造成的不能服务或延迟服务，或提供的信息及数据的延误、停滞或错误等行为。如发生不可抗力情形，我们将尽可能及时修复，但是由此给您造成的损失，”榕树云”在法律允许的范围内免责。
                </div>
                <h4>2. 其他免责事由</h4>
                <div>
                    <ul>
                        <li>1) 您对于职位数据库发布的信息的真实性、准确性和合法性负有全部责任；</li>
                        <li>2) 企业用户及个人用户均应审慎的对待他方之行为，”榕树云”无法对用户的线下行为负责，因为他方之行为给用户造成任何不利影响的，”榕树云”不承担任何法律责任；</li>
                        <li>3)
                            为向用户提供便利而设置的外部链接网址，”榕树云”并不保证其准确性、安全性和完整性，亦并不代表”榕树云”对其链接内容的认可，请您谨慎确认后再使用。由于与”榕树云”链接的其他网站或用户所使用的网络运营商所造成的个人信息泄露或其他任何损失，以及由此而导致的任何法律争议和后果均由其他网站或用户所使用的网络运营商负责；
                        </li>
                        <li>4) 除非另有明确书面说明，在符合法律法规规定的情况下，”榕树云”不对其网站和客户端上的信息、内容、材料、产品或服务做任何形式的明示或默示的声明或担保；</li>
                        <li>5) 在法律允许的范围内，”榕树云”及其关联公司对于本用户协议项下任何索赔的全部赔偿责任限于您因使用服务而向我们支付的金额。</li>
                    </ul>
                </div>
                <h3>七、协议的修改与终止</h3>
                <div>
                    我们可能随时修改本用户协议和《”榕树云”隐私政策》，例如，为反映我们服务的变化而进行修改。您应当定期查阅本用户协议。若有重大变更，我们将通过网页或推送通知等有效方式发布或发送关于条款更改的公告，使您有机会在更改生效之前查看更改。如您不同意任何更改的内容，可停止更改内容所涉及的服务或联系客服以注销账户。如您在上述更改内容实施后继续使用所涉及的服务，将视为您已同意各项更新修改内容。
                    <div>当发生以下任一情况时，本用户协议终止：</div>
                    <ul>
                        <li>1) “榕树云”根据本用户协议相关条款的规定，停止、注销您的企业账号，本用户协议于账号停止、注销之日终止；</li>
                        <li>2) 您在符合条件的情况下通过联系客服的方式注销您的企业账号，本用户协议于账号注销之日终止；</li>
                        <li>3) “榕树云”有权根据自身商业安排终止全部”榕树云”服务，我们将合理的期限内提前通知您，本用户协议于”榕树云”服务依法定程序及方式终止之日终止。</li>
                        <li>
                            本用户协议终止后，您使用”榕树云”服务的权利即告终止。”榕树云”将无法继续向您提供任何服务或履行任何其他义务，包括但不限于为您保留或向您展示原”榕树云”账号中的任何信息，例如向您或其他第三方发送您所形成的信息资料等。本用户协议的终止不影响知识产权条款以及其他根据其内容应继续有效的条款的有效性。
                        </li>
                    </ul>
                </div>
                <h3>八、通知</h3>
                <div>
                    当您注册企业账号并接受”榕树云”服务时，您应该向”榕树云”提供真实有效的联系方式（包括您的工作邮箱、联系电话等），使”榕树云”能随时联系您并向您发出有效的通知。此外，”榕树云”向您浏览界面推送的弹窗等通知形式，也视作向您发出的有效通知。
                </div>
                <div>
                    您理解且同意，您应当保证所提供的联系方式是准确、有效的，并进行实时更新。如果因提供的联系方式不确切，或不及时告知变更后的联系方式，使通知无法送达或未及时送达，由您自行承担由此可能产生的法律后果。
                </div>
                <h3>九、法律管辖适用及其他</h3>
                <div>
                    <div>本用户协议适用中华人民共和国法律。您理解且同意，如您因使用”榕树云”服务与”榕树云”产生纠纷，我们将与您协商解决，协商不成时，任何一方均可向”榕树云”注册地有管辖权的人民法院提起诉讼。
                    </div>
                    <div>如果您与我们同时签署了线下的服务协议，法律管辖适用线下的服务协议的规定；若您与我们仅签署了线上的《”榕树云”用户服务协议》，则适用本用户协议的管辖条款。</div>
                    <div>如果本用户协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。无法适用的条款将会被修改，以便其能够依法适用。</div>
                    <div>未明示授权的其他权利仍由”榕树云”保留，您在行使这些权利时须另外取得”榕树云”的书面许可。”榕树云”如果未行使前述任何权利，并不构成对该权利的放弃。</div>
                </div>
            </div>
            <template #footer>
                <el-button @click="centerDialogVisible2 = true">不同意</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">同意</el-button>
            </template>
        </el-dialog>
        <!-- 点击不同意的时候展示的弹层 -->
        <el-dialog class="el-dialog_two" v-model="centerDialogVisible2" :show-close="false" align-center>
            <div class="dialog__body-two">
                <div>如不同意本协议，则无法继续使用榕树云相关的产品及服务。</div>
                <div>是否确定继续<b>“不同意“本协议</b>?</div>
            </div>
            <template #footer>
                <el-button @click="centerDialogVisible2 = false">取消</el-button>
                <el-button type="primary" @click="nav('/')">确定并退出登录</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import footerBar from '@/components/footer/footerBar.vue';
// 这个是企业注册地区的数据
// 这个是form表单要用的
import { reactive } from 'vue';
// 这个是企业LOGO上传头像需要用到的
import { ref } from 'vue';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus';
import { useHomeStore } from '@/stores/home';
    
import { useRouter } from 'vue-router';
// 路由
let router = useRouter();
// ajax
const use = useHomeStore();
// centerDialogVisible 控制用户协议弹窗打开与否
const centerDialogVisible = ref(true);
// centerDialogVisible2 控制用户协议中点击 不同意的时候弹的弹层
const centerDialogVisible2 = ref(false);
// 跳转页面的方法
let nav = (name: string) => {
    router.push(name);
}
// form 表单数据
const form = reactive({
    companyFullName: '',// 企业全称
    companyName: '',// 企业简称 (品牌名称)
    companyStatus: 0,// 企业状态 integer 整数类型
    companyLogo: '',// 企业Logo
    companyRegisterAddr: '',// 企业地址
    companyAddr: '',// 企业详细地址
    companyIndustryLeft: '',// 企业所属行业
    companyIndustryRight: '',// 企业所属行业
    companyNature: 0,// 企业性质 integer
    companySize: 0,// 企业规模 integer
    companyTag: 0,// 企业标签 integer
    companySocialCreditCode: '',//企业社会信用代码
    companyLicense: '',// 企业营业执照 file
    companyLicenseUrl: '',// 企业营业执照Url 不填
    companyContactName: '',// 企业联系人
    companyContactPhone: '',// 企业联系电话
    companyContactEmail: '',// 企业接收简历邮箱
    companyIntroducation: '',// 企业简介
    companyWebUrl: '',// 企业官网
    companyWishSchool: '',// 企业意向学校
});
function add(file: any) {
    console.log(file)
}
// 点击提交按钮走的方法
const onSubmit = () => {
    console.log(form)
};
// 企业性质
const enterpriseNatureVal = ref('请选择')
// 企业规模
const enterpriseScaleVal = ref('请选择')
// 企业标签
const enterpriseLabelVal = ref('请选择')
// 所属行业
const forbidden = ref('请选择');
const forbiddenData = ref(<any>[]);
const handleChange = (value: any) => {
    console.log(value)
}
// 调用 获取所属行业下拉框接口 报错
let getIndustryList = async function () {
    let res = await use.getIndustryList();
    Object.assign(forbiddenData.value, res.data)
}
getIndustryList();
// 上传企业LOGO的逻辑
const dialogVisible = ref(false);
const disabled = ref(false);
const handleRemove = (file: UploadFile) => {
    console.log(file)
};
const handlePictureCardPreview = (file: UploadFile) => {
    console.log('log ~ file', file);
    dialogVisible.value = true;
    console.log(1);
};
const handleDownload = (file: UploadFile) => {
    console.log(file)
    console.log('log ~ file.url', file.url);
};
// 企业性质
interface EnterpriseNature {
    label: string,
    value: number,
    createTime: null,
    modifyTime: null
}
let enterpriseNature = reactive<EnterpriseNature[]>([]);
// 调用 获取企业性质下拉框
let getEnterpriseNatureList = async function () {
    let res = await use.getEnterpriseNatureList();
    Object.assign(enterpriseNature, res.data)
}
getEnterpriseNatureList();
// 企业规模
interface EnterpriseScale {
    createTime: null,
    label: string,
    modifyTime: null,
    value: number,
}
let enterpriseScale = reactive<EnterpriseScale[]>([])
// 调用 获取企业规模下拉框
let getEnterpriseSizeList = async function () {
    let res = await use.getEnterpriseSizeList();
    Object.assign(enterpriseScale, res.data)
}
getEnterpriseSizeList();
// 企业标签
interface EnterpriseLabel {
    createTime: null,
    label: string,
    modifyTime: null,
    value: number,
}
let enterpriseLabel = reactive<EnterpriseLabel[]>([]);
// 调用 获取企业标签下拉框
let getEnterpriseTagList = async function () {
    let res = await use.getEnterpriseTagList();
    Object.assign(enterpriseLabel, res.data);
}
getEnterpriseTagList();
const schoolListVal = ref([]);
// 学校列表
interface SchoolList {
    schoolId: number,
    schoolName: string,
    sortId: number,
}
const schoolList = reactive<SchoolList[]>([]);
let getSchoolList = async function () {
    let res = await use.getSchoolList();
    Object.assign(schoolList, res.data);
}
getSchoolList();
</script>

<style lang="scss" scoped>
:deep(.el-dialog_one) {
    min-width: 800px;
    border-radius: 10px;
    padding: 0;
}

:deep(.el-dialog_two) {
    width: 465px;
    height: 187px;
    border-radius: 10px;
}
:deep(.el-dialog_two .el-dialog__header){
    padding: 50px 0 0 0;
}
:deep(.el-dialog_two .el-dialog__body){
    height: auto;
    border: none;
    font-size: 12px;
    div{
        margin: 9px 0;
        color: #38393b;
    }
    b{
        color: #000;
    }
}
:deep(.el-dialog_two .el-dialog__footer) {
    padding: 24px 20px 24px 0;
    margin: 0;
}

:deep(.el-dialog__header) {
    margin: 0;
    text-align: center;
    padding: 40px 0 36px 0;
    font-size: 20px;
    color: #000;
}

:deep(.el-dialog__body) {
    height: 402px;
    padding: 0 46px 0 46px;
    border-bottom: 1px solid #ccc;
    overflow: scroll;

    .dialog__body {
        color: #3b3b3b;

        div {
            line-height: 24px;
            margin: 10px 0;
        }

        h3 {
            font-size: 16px;
            color: #000;
            margin: 30px 0;
        }

        h4 {
            font-size: 14px;
            color: #000;
        }
    }
}

.mt-23 {
    margin-top: 23px;
}

:deep(.el-dialog__footer) {
    padding: 24px 20px 24px 0;
    margin: 0;
}

.el-dialog__footer .el-button:nth-of-type(2) {
    margin-left: 20px;
}

.fs-13 {
    font-size: 13px;
}

.business-license_test {
    color: #808695;
}

.flex-column-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.uplpoad-icon {
    width: 100%;
    height: 100%;
}

.ml-16 {
    margin-left: 16px;
}

:deep(.el-input__inner) {
    height: 40px;
}

:deep(.el-input_240) {
    width: 240px;
    height: 40px;
}

:deep(.school-input) {
    max-width: 240px !important;
}

:deep(.el-select) {
    width: 240px;
    // height: 40px;
}

:deep(.submit-button) {
    width: 268px;
    height: 40px;
    margin: 32px 0 64px 156px;
}

:deep(textarea) {
    width: 560px !important;
    height: 184px;
}

:deep(el-select) {
    max-width: 560px;
    height: 192px;
}

:deep(.input_280-40) {
    width: 280px;
    height: 40px;
}

.enterprise-registra {
    background-color: #f6f7f9;
    font-family: MicrosoftYaHei;
    overflow: hidden;

    &>.container {
        &>.title-wrap {
            display: flex;
            -webkit-box-pack: justify;
            justify-content: space-between;
            -webkit-box-align: center;
            align-items: center;

            &>h2 {
                font-size: 28px;
                font-weight: 400;
                color: #17233d;
                line-height: 1;
                margin: 32px 0;
            }
        }

        .form {
            background-color: #fff;
            box-sizing: border-box;
            padding: 32px;
            border-radius: 4px;
            margin-bottom: 16px;

            .school_test {
                margin-left: 24px;

                b {
                    color: #356ffa;
                    font-size: 19px;
                    font-weight: 700;
                    font-style: normal;
                }

                span {
                    font-size: 14px;
                }
            }

            h3 {
                font-size: 18px;
                line-height: 1;
                margin-bottom: 32px;
                font-weight: 400;
                color: #17233d;
            }

            .horizontal-line {
                height: 1px;
                border-top: 1px solid #eef0f2;
                margin-bottom: 32px;
                margin-top: 8px;
            }

            .el-input_560-40 {
                width: 560px;
                height: 40px;
            }

            .brand-name {
                width: 280px;
                height: 40px;
            }

            .el-upload--picture-card {
                width: 104px;
                height: 104px;
            }

            .intention-description {
                font-size: 14px;
                color: #808695;
            }
        }
    }
}

.mb-24 {
    margin-bottom: 24px;
}
</style>