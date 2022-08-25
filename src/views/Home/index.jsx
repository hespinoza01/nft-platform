import { FiAirplay, FiAlignCenter } from 'react-icons/fi'
import Button from 'shared/components/Button'
import InputField from 'shared/components/InputField'
import { Role, Variant } from 'shared/types'

export default function Home() {
    return (
        <section className='Home'>
            <InputField
                role={Role.NONE}
                label='Input'
                placeholder='Input...'
                hint='Input'
                type='password'
                options={[
                    { label: 'Option 1', value: 1 },
                    { label: 'Option 2', value: 2 },
                ]}
                afterIcon={<FiAlignCenter />}
                beforeIcon={<FiAirplay />}
            />

            <Button role={Role.PRIMARY} variant={Variant.TEXT}>
                Click Me...
            </Button>
        </section>
    )
}
