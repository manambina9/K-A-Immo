<?php

namespace App\Form;

use App\Entity\MaisonLocation;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MaisonLocationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nom')
            ->add('adresse')
            ->add('ville')
            ->add('codePostal')
            ->add('description')
            ->add('prix')
            ->add('surface')
            ->add('nbChambres')
            ->add('disponible')
            ->add('dateDisponibilite', null, [
                'widget' => 'single_text',
            ])
            ->add('type')
            ->add('image')
            ->add('latitude')
            ->add('longitude')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => MaisonLocation::class,
        ]);
    }
}
