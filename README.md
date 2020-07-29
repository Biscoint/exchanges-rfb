# Exchanges RFB
Lib to produce the report required by [IN 1888](http://normas.receita.fazenda.gov.br/sijut2consulta/link.action?visao=anotado&idAto=100592) from Receita Federal do Brasil in accordance to its [manuals and layouts](https://receita.economia.gov.br/orientacao/tributaria/declaracoes-e-demonstrativos/criptoativos).

## Installing
### [YARN](https://yarnpkg.com/)
- Command: `yarn add exchanges-rfb`
### [NPM](http://npmjs.org/)
- Command: ```npm install exchanges-rfb --save```

## Usage Example

```js
import Exchange from "exchanges-rfb"

const MyEx = new Exchange({
  exchange_name: "BiscointEx",
  exchange_cnpj: "17.869.530/0001-73",
  exchange_url: "https://testex.biscoint.io"
})

MyEx.addBuySellOperation({
  date,
  id,
  brl_value,
  brl_fees,
  coin_symbol,
  coin_quantity,
  buyer_identity_type,
  buyer_country,
  buyer_document,
  buyer_fullname,
  buyer_address,
  seller_identity_type,
  seller_country,
  seller_document,
  seller_fullname,
  seller_address
})

console.log(MyEx.exportFile())
```

We included an example output file [here](https://github.com/Biscoint/exchanges-rfb/blob/master/test/example-output).

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
